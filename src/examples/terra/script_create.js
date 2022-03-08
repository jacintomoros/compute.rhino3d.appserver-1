import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader()
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' )

// initialise 'data' object that will be used by compute()
const data = {
  definition: 'terra.gh',
  inputs: {
    'points': [] // start with an empty list (corresponds to "points" input)
  }
}

// globals
let rhino, doc

rhino3dm().then(async m => {
    rhino = m

    init()
    // compute() // don't compute until user clicks - see onClick()
})

const downloadButton = document.getElementById("downloadButton")
downloadButton.onclick = download

const mouse = new THREE.Vector3()
window.addEventListener( 'click', onClick, false);

  /////////////////////////////////////////////////////////////////////////////
 //                            HELPER  FUNCTIONS                            //
/////////////////////////////////////////////////////////////////////////////

// more globals
let scene, camera, renderer, controls

/**
 * Sets up the scene, camera, renderer, lights and controls and starts the animation
 */
function init() {

    // Rhino models are z-up, so set this as the default
    THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

    // create a scene and a camera
    scene = new THREE.Scene()
    //scene.background = new THREE.Color(1, 1, 1)

    ///////////////////////////////////////////////////////////////////////////

    // top view
    // near/far set up to draw on z=0 plane
    const frustumSize = 10000
    const aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.OrthographicCamera( frustumSize * aspect / - 200, frustumSize * aspect / 200, frustumSize / 200, frustumSize / - 200, -100, 1 );

    ///////////////////////////////////////////////////////////////////////////

    // very light grey for background, like rhino
    //scene.background = new THREE.Color('black')

    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // add some controls to orbit the camera
    // controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableRotate = false

    // add a directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff )
    directionalLight.intensity = 2
    scene.add( directionalLight )

    const ambientLight = new THREE.AmbientLight()
    scene.add( ambientLight )

    let cubeMap
    // load hdr cube map
    // cubeMap = new HDRCubeTextureLoader()
    //     .setPath( './textures/cube/pisaHDR/' )
    //     .setDataType( THREE.UnsignedByteType )
    //     .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ] )
    
    // or, load cube map
    cubeMap = new THREE.CubeTextureLoader()
        .setPath('gradient/')
        .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] )
    
    scene.background = cubeMap

    // handle changes in the window size
    window.addEventListener( 'resize', onWindowResize, false )

    animate()
}

/**
 * Call appserver
 */
async function compute() {

  showSpinner(true)

  // use POST request
  const request = {
    'method':'POST',
    'body': JSON.stringify(data),
    'headers': {'Content-Type': 'application/json'}
  }
  
  try {
    const response = await fetch('/solve', request)
  
    if(!response.ok) {
      // TODO: check for errors in response json
      throw new Error(response.statusText)
    }

    const responseJson = await response.json()

    collectResults(responseJson)

  } catch(error) {
    console.error(error)
  }
}

/**
 * Parse response
 */
function collectResults(responseJson) {

    const values = responseJson.values

    console.log(values)

    // clear doc
    try {
    if( doc !== undefined)
        doc.delete()
    } catch {}

    //console.log(values)
    doc = new rhino.File3dm()

    // for each output (RH_OUT:*)...
    for ( let i = 0; i < values.length; i ++ ) {
      // ...iterate through data tree structure...
      for (const path in values[i].InnerTree) {
        const branch = values[i].InnerTree[path]
        // ...and for each branch...
        for( let j = 0; j < branch.length; j ++) {
          // ...load rhino geometry into doc
          const rhinoObject = decodeItem(branch[j])
          if (rhinoObject !== null) {
            // console.log(rhinoObject)
            doc.objects().add(rhinoObject, null)
          }
        }
      }
    }

    if (doc.objects().count < 1) {
      console.error('No rhino objects to load!')
      showSpinner(false)
      return
    }

    // hack (https://github.com/mcneel/rhino3dm/issues/353)
    doc.objects().addSphere(new rhino.Sphere([0,0,0], 0.001), null)

    // load rhino doc into three.js scene
    const buffer = new Uint8Array(doc.toByteArray()).buffer
    loader.parse( buffer, function ( object ) 
    {
        // clear objects from scene
        scene.traverse(child => {
          if (!child.isLight) {
            scene.remove(child)
          }
        })

        ///////////////////////////////////////////////////////////////////////
        
        // render wireframe mesh
        // object.traverse(child => {
        //   if (child.isMesh) {
        //     child.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 'white' })
        //   }
        // }, false)

        ///////////////////////////////////////////////////////////////////////

        // add object graph from rhino model to three.js scene
        scene.add( object )

        // hide spinner and enable download button
        showSpinner(false)
        downloadButton.disabled = false

        // zoom to extents
        zoomCameraToSelection(camera, controls, scene.children)
    })
}

/**
 * Attempt to decode data tree item to rhino geometry
 */
function decodeItem(item) {
  const data = JSON.parse(item.data)
  if (item.type === 'System.String') {
    // hack for draco meshes
    try {
        return rhino.DracoCompression.decompressBase64String(data)
    } catch {} // ignore errors (maybe the string was just a string...)
  } else if (typeof data === 'object') {
    return rhino.CommonObject.decode(data)
  }
  return null
}

/**
 * Handle click events
 */
function onClick( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  mouse.z = 0
  mouse.unproject(camera)

  console.log( `${mouse.x},${mouse.y},${mouse.z}` )

  // add json-encoded Point3d to list
  // e.g. '{ "X": 1.0, "Y": 2.0, "Z": 0.0 }'
  const pt = "{\"X\":"+mouse.x+",\"Y\":"+mouse.y+",\"Z\":"+mouse.z+"}"
  // in delaunay.gh the input is "points"
  data.inputs['points'].push(pt)

  // don't bother solving until we have three points
  if (data.inputs['points'].length < 3) {
    console.log("Need at least three points!")
    return
  }

  // solve and update the geometry!
  compute()

}
/**
 * The animation loop!
 */
function animate() {
  requestAnimationFrame( animate )
  // controls.update()
  renderer.render(scene, camera)
}

/**
 * Helper function for window resizes (resets the camera pov and renderer size)
  */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

/**
 * Helper function that behaves like rhino's "zoom to selection", but for three.js!
 */
function zoomCameraToSelection( camera, controls, selection, fitOffset = 1.2 ) {
  
  const box = new THREE.Box3();
  
  for( const object of selection ) {
    if (object.isLight) continue
    box.expandByObject( object );
  }
  
  const size = box.getSize( new THREE.Vector3() );
  const center = box.getCenter( new THREE.Vector3() );
  
  const maxSize = Math.max( size.x, size.y, size.z );
  const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
  
  const direction = controls.target.clone()
    .sub( camera.position )
    .normalize()
    .multiplyScalar( distance );
  controls.maxDistance = distance * 10;
  controls.target.copy( center );
  
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  camera.position.copy( controls.target ).sub(direction);
  
  controls.update();
  
}

/**
 * This function is called when the download button is clicked
 */
function download () {
    // write rhino doc to "blob"
    const bytes = doc.toByteArray()
    const blob = new Blob([bytes], {type: "application/octect-stream"})

    // use "hidden link" trick to get the browser to download the blob
    const filename = data.definition.replace(/\.gh$/, '') + '.3dm'
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
}

/**
 * Shows or hides the loading spinner
 */
function showSpinner(enable) {
  if (enable)
    document.getElementById('loader').style.display = 'block'
  else
    document.getElementById('loader').style.display = 'none'
}