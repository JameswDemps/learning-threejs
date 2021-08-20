import logo from './logo.svg';
import './App.css';

// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import {WEBGL} from "three/examples/jsm/WebGL";

const scene = new THREE.Scene();

// // Option 2: Import just the parts you need.
// import { Scene } from 'three';
//
// const scene = new Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
}

if ( WEBGL.isWebGLAvailable() ) {
// if ( false ) {

  // Initiate function or other initializations here
  animate();

} else {

  const warning = WEBGL.getWebGLErrorMessage();
  console.log('warning: ', warning)
  document.getElementById( 'app thing' ).appendChild( warning );

}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
