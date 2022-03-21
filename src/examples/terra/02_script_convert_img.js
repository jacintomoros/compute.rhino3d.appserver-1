//Script by MaCAD's Digital Tool for Data-Cloud Management Faculty
//David Andrés León and Hesham Sawqy
//Updates by Jacinto Jesús Moros Montañés

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/3DMLoader.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'
import { TransformControls } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/TransformControls.js";

// We set up first the menu appearance
let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let imageAdd = document.querySelector(".bx-image-add");

btn.onclick = function(){
  sidebar.classList.toggle("active");
}

imageAdd.onclick = function(){
  sidebar.classList.toggle("active");
}

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader()
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' )

// set up gh definition
const definition = 'convert_landscape.gh'

// adding inputs
const fileInput = document.getElementById("img");

img.onchange = evt => {
  const [file] = img.files
  if (file) {
    blah.src = URL.createObjectURL(file)
  }
}

fileInput.addEventListener("change", (e) => {
    // get a reference to the file
    const file = e.target.files[0];

    // encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      // use a regex to remove data url part
    obPath.innerText= reader.result.replace("data:", "").replace(/^.+,/, "");
      // log to console
      // logs wL2dvYWwgbW9yZ...
      String(obPath);
    };
    reader.readAsDataURL(file);
  });

  //initialize fixity values
var analyzeval = 0;

// Set up texts

const terrain = document.getElementById('terrain');
terrain.addEventListener('click', radioClick);
const slope = document.getElementById('slope');
slope.addEventListener('click', radioClick);
const concavity = document.getElementById('concavity');
concavity.addEventListener('click', radioClick);
const elevation = document.getElementById('elevation');
elevation.addEventListener('click', radioClick);
const rougness = document.getElementById('rougness');
rougness.addEventListener('click', radioClick);
const shade = document.getElementById('shade');
shade.addEventListener('click', radioClick);
const orientation = document.getElementById('orientation');
orientation.addEventListener('click', radioClick);
const viewshed = document.getElementById('viewshed');
viewshed.addEventListener('click', radioClick);
const watershed = document.getElementById('watershed');
watershed.addEventListener('click', radioClick);
const location = document.getElementById('location');
location.addEventListener('click', radioClick);

const obPath = document.getElementById('obPath')
obPath.addEventListener('input', onChange, false)

const maxelev = document.getElementById('Max Elevation')
maxelev.addEventListener('input', onChange, false)

const minelev = document.getElementById('Min Elevation')
minelev.addEventListener('input', onChange, false)

const res_slider = document.getElementById( 'Resolution' )
res_slider.addEventListener( 'mouseup', onSliderChange, false )
res_slider.addEventListener( 'touchend', onSliderChange, false )

const maxslope_slider = document.getElementById( 'Max Slope' )
maxslope_slider.addEventListener( 'mouseup', onSliderChange, false )
maxslope_slider.addEventListener( 'touchend', onSliderChange, false )

const minslope_slider = document.getElementById( 'Min Slope' )
minslope_slider.addEventListener( 'mouseup', onSliderChange, false )
minslope_slider.addEventListener( 'touchend', onSliderChange, false )

const maxconca_slider = document.getElementById( 'Max Conca' )
maxconca_slider.addEventListener( 'mouseup', onSliderChange, false )
maxconca_slider.addEventListener( 'touchend', onSliderChange, false )

const minconca_slider = document.getElementById( 'Min Conca' )
minconca_slider.addEventListener( 'mouseup', onSliderChange, false )
minconca_slider.addEventListener( 'touchend', onSliderChange, false )

const maxrou_slider = document.getElementById( 'Max Roughness' )
maxrou_slider.addEventListener( 'mouseup', onSliderChange, false )
maxrou_slider.addEventListener( 'touchend', onSliderChange, false )

const minrou_slider = document.getElementById( 'Min Roughness' )
minrou_slider.addEventListener( 'mouseup', onSliderChange, false )
minrou_slider.addEventListener( 'touchend', onSliderChange, false )

const xvec_slider = document.getElementById( 'X Vector' )
xvec_slider.addEventListener( 'mouseup', onSliderChange, false )
xvec_slider.addEventListener( 'touchend', onSliderChange, false )

const yvec_slider = document.getElementById( 'Y Vector' )
yvec_slider.addEventListener( 'mouseup', onSliderChange, false )
yvec_slider.addEventListener( 'touchend', onSliderChange, false )

const zvec_slider = document.getElementById( 'Z Vector' )
zvec_slider.addEventListener( 'mouseup', onSliderChange, false )
zvec_slider.addEventListener( 'touchend', onSliderChange, false )

const maxpend_slider = document.getElementById( 'Max Pend' )
maxpend_slider.addEventListener( 'mouseup', onSliderChange, false )
maxpend_slider.addEventListener( 'touchend', onSliderChange, false )

const minpend_slider = document.getElementById( 'Min Pend' )
minpend_slider.addEventListener( 'mouseup', onSliderChange, false )
minpend_slider.addEventListener( 'touchend', onSliderChange, false )


// Get number slider

const resVal = document.getElementById("resVal");
resVal.innerHTML = res_slider.value;
res_slider.oninput = function(){
  resVal.innerHTML = this.value;
}

const minSlopeVal = document.getElementById("minSlopeVal");
minSlopeVal.innerHTML = minslope_slider.value;
minslope_slider.oninput = function(){
  minSlopeVal.innerHTML = this.value;
}

const maxSlopeVal = document.getElementById("maxSlopeVal");
maxSlopeVal.innerHTML = maxslope_slider.value;
maxslope_slider.oninput = function(){
maxSlopeVal.innerHTML = this.value;
}

const maxConcaVal = document.getElementById("maxConcaVal");
maxConcaVal.innerHTML = maxconca_slider.value;
maxconca_slider.oninput = function(){
  maxConcaVal.innerHTML = this.value;
}

const minConcaVal = document.getElementById("minConcaVal");
minConcaVal.innerHTML = minconca_slider.value;
minconca_slider.oninput = function(){
  minConcaVal.innerHTML = this.value;
}

const maxRoughVal = document.getElementById("maxRoughVal");
maxRoughVal.innerHTML = maxrou_slider.value;
maxrou_slider.oninput = function(){
  maxRoughVal.innerHTML = this.value;
}

const minRoughVal = document.getElementById("minRoughVal");
minRoughVal.innerHTML = minrou_slider.value;
minrou_slider.oninput = function(){
  minRoughVal.innerHTML = this.value;
}

const maxPendVal = document.getElementById("maxPendVal");
maxPendVal.innerHTML = maxpend_slider.value;
maxpend_slider.oninput = function(){
  maxPendVal.innerHTML = this.value;
}

const minPendVal = document.getElementById("minPendVal");
minPendVal.innerHTML = minpend_slider.value;
minpend_slider.oninput = function(){
  minPendVal.innerHTML = this.value;
}

const xVal = document.getElementById("xVal");
xVal.innerHTML = xvec_slider.value;
xvec_slider.oninput = function(){
  xVal.innerHTML = this.value;
}

const yVal = document.getElementById("yVal");
yVal.innerHTML = yvec_slider.value;
yvec_slider.oninput = function(){
  yVal.innerHTML = this.value;
}

const zVal = document.getElementById("zVal");
zVal.innerHTML = zvec_slider.value;
zvec_slider.oninput = function(){
  zVal.innerHTML = this.value;
}

// globals

let point = [];
let rhino, doc

rhino3dm().then(async m => {
    console.log('Loaded rhino3dm.')
    rhino = m

    init()
    rndPts()
    compute()
})

const downloadButton = document.getElementById("downloadButton")
downloadButton.onclick = download

  /////////////////////////////////////////////////////////////////////////////
 //                            HELPER  FUNCTIONS                            //
/////////////////////////////////////////////////////////////////////////////

function rndPts() {
  // generate Inital point
  const startPts = [
    { x: 27, y: 43, z: 50 } 


]
const cntPts = startPts.length

  for (let i = 0; i < cntPts; i++) {
    const x = startPts[i].x
    const y = startPts[i].y
    const z = startPts[i].z

    const pt = "{\"X\":" + x + ",\"Y\":" + y + ",\"Z\":" + z + "}"

    console.log( `x ${x} y ${y}` )

    point.push(pt)

    //viz in three
    const icoGeo = new THREE.SphereGeometry(5)
    const icoMat = new THREE.MeshNormalMaterial(50)
    const ico = new THREE.Mesh( icoGeo, icoMat )
    ico.name = 'ico'
    ico.position.set( x, y, z)
    scene.add( ico )
    
    let tcontrols = new TransformControls( camera, renderer.domElement )
    tcontrols.enabled = true
    tcontrols.attach( ico )
    //tcontrols.showZ = false
    tcontrols.addEventListener( 'dragging-changed', onChange )
    tcontrols.setSize(.2)
    scene.add(tcontrols)
    
  }

}

let dragging = false

function onChange() {
  dragging = ! dragging
  if ( !dragging ) {
    // update points position
    point = []
    scene.traverse(child => {
      if ( child.name === 'ico' ) {
        const pt = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        point.push( pt )
        console.log(pt)
      }
    }, false)

    compute()

    controls.enabled = true
    return 
}

  controls.enabled = false

}

//function sets fixity values on click and recomputes
function radioClick(){

  const analyzeButtons = document.querySelectorAll('input[name="analyzeBottom"]');
    for (const analyzeButton of analyzeButtons){
        if (analyzeButton.checked){
            analyzeval = analyzeButton.value;
        return;
      
    }}
    
  // show spinner
  // document.getElementById('loader').style.display = 'block'
  // compute()
}

// more globals
let scene, camera, renderer, controls

/**
 * Sets up the scene, camera, renderer, lights and controls and starts the animation
 */
function init() {

    // Rhino models are z-up, so set this as the default
    THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

    // create a scene and a camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(1, 1, 1);
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.x = 1000;
    camera.position.y = 1000;
    camera.position.z = 1000;

    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // add some controls to orbit the camera
    controls = new OrbitControls(camera, renderer.domElement)

    // add a directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff )
    directionalLight.intensity = 2
    scene.add( directionalLight )

    const ambientLight = new THREE.AmbientLight()
    scene.add( ambientLight )

    let cubeMap
//  // load hdr cube map
//  // cubeMap = new HDRCubeTextureLoader()
//  //     .setPath( './textures/cube/pisaHDR/' )
//  //     .setDataType( THREE.UnsignedByteType )
//  //     .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ] )
 
//  // or, load cube map
      cubeMap = new THREE.CubeTextureLoader()
     .setPath('./gradient/')
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
  const data = {
    definition: definition,
    inputs: {
     'Resolution': res_slider.valueAsNumber,
     'Upload Image': obPath.innerText,
     'Max Elevation': maxelev.value,
     'Min Elevation': minelev.value,
     'Max Slope': maxslope_slider.valueAsNumber,
     'Min Slope': minslope_slider.valueAsNumber,
     'Max Conca': maxconca_slider.valueAsNumber,
     'Min Conca': minconca_slider.valueAsNumber,
     'Max Roughness': maxrou_slider.valueAsNumber,
     'Min Roughness': minrou_slider.valueAsNumber,
     'Analyze': analyzeval,
     'X Vector': xvec_slider.valueAsNumber,
     'Y Vector': yvec_slider.valueAsNumber,
     'Z Vector': zvec_slider.valueAsNumber,
     'Max Pend': maxpend_slider.valueAsNumber,
     'Min Pend': minpend_slider.valueAsNumber,
     'point': point,
      }
  }

  showSpinner(true)

  console.log(data.inputs)

  const request = {
    'method':'POST',
    'body': JSON.stringify(data),
    'headers': {'Content-Type': 'application/json'}
  }

  try {
    const response = await fetch('/solve', request)

    if(!response.ok)
      throw new Error(response.statusText)

    const responseJson = await response.json()
    collectResults(responseJson)

  } catch(error){
    console.error(error)
  }
}

/**
 * Parse response
 */
function collectResults(responseJson) {

    const values = responseJson.values

    // clear doc
    if( doc !== undefined)
        doc.delete()

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

      // load rhino doc into three.js scene
  const buffer = new Uint8Array(doc.toByteArray()).buffer;
  loader.parse(buffer, function (object) {
    // clear objects from scene
    scene.traverse((child) => {
      if (
        child.userData.hasOwnProperty("objectType") &&
        child.userData.objectType === "File3dm"
      ) {
        scene.remove(child);
      }
    });

    
        // add object graph from rhino model to three.js scene
        scene.add( object )

        // hide spinner and enable download button
        showSpinner(false)
        downloadButton.disabled = false

        // zoom to extents
        //zoomCameraToSelection(camera, controls, scene.children)
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
 * Called when a slider value changes in the UI. Collect all of the
 * slider values and call compute to solve for a new scene
 */

//  function onChange() {

//   // show spinner
//   document.getElementById('loader').style.display = 'block';

//   compute();
// }

 function onSliderChange() {
  // show spinner
  document.getElementById('loader').style.display = 'flex'
  compute()
}

/**
 * The animation loop!
 */
 function animate() {
  requestAnimationFrame( animate )
  controls.update()
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
// function zoomCameraToSelection( camera, controls, selection, fitOffset = 1.2 ) {
  
//   const box = new THREE.Box3();
  
//   for( const object of selection ) {
//     if (object.isLight) continue
//     box.expandByObject( object );
//   }
  
//   const size = box.getSize( new THREE.Vector3() );
//   const center = box.getCenter( new THREE.Vector3() );
  
//   const maxSize = Math.max( size.x, size.y, size.z );
//   const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
//   const fitWidthDistance = fitHeightDistance / camera.aspect;
//   const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
  
//   const direction = controls.target.clone()
//     .sub( camera.position )
//     .normalize()
//     .multiplyScalar( distance );
//   controls.maxDistance = distance * 10;
//   controls.target.copy( center );
  
//   camera.near = distance / 100;
//   camera.far = distance * 100;
//   camera.updateProjectionMatrix();
//   camera.position.copy( controls.target ).sub(direction);
  
//   controls.update();
  
// }

/**
 * This function is called when the download button is clicked
 */
 function download (){
  let buffer = doc.toByteArray()
  let blob = new Blob([ buffer ], { type: "application/octect-stream" })
  let link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'bimsc22_landscape.3dm'
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