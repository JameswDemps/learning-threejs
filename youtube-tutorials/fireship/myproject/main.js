import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// learnt from tutorial https://www.youtube.com/watch?v=Q7AOvWpIVHU

const scene = new THREE.Scene();

// first arg = fov, second is aspect ratio, finals are view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// assign renderer to the desired dom element
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )

const initialCameraPosition = 30

camera.position.setZ(initialCameraPosition)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );

const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const star = new THREE.Mesh( geometry, material )

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
}

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png')

const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( { map: jeffTexture } )
)

scene.add(jeff)

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture } )
)

// set or equals do that same thing
moon.position.z = 30
moon.position.setX(-10)

scene.add(moon)

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

function animate() {
    requestAnimationFrame( animate )

    torus.rotation.x += 0.01
    torus.rotation.y += 0.01
    torus.rotation.z += 0.01

    controls.update()

    renderer.render(scene, camera)
}

animate()

function moveCamera() {

    const t = document.body.getBoundingClientRect().top
    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    jeff.rotation.y += 0.01
    jeff.rotation.z += 0.01

    camera.position.z = initialCameraPosition + t * -0.1
    camera.position.x = initialCameraPosition + t * -0.002
    camera.rotation.y = initialCameraPosition + t * -0.002
}

document.body.onscroll = moveCamera