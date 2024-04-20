import * as THREE from 'three';

const scene = new THREE.Scene()
const aspectRatio = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
//create distant background
const textureLoader = new THREE.TextureLoader();
const staticBackgroundTexture = textureLoader.load("./bg_fog_mountain.jpg")
const staticBackgroundMaterial = new THREE.MeshBasicMaterial({ map: staticBackgroundTexture })
const staticBackgroundGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
const staticBackground = new THREE.Mesh(staticBackgroundGeometry, staticBackgroundMaterial)
staticBackground.position.z = -600;
scene.add(staticBackground)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const clock = new THREE.Clock()
let elapsedTime = 0
function animate() {

  const deltaTime = clock.getDelta()
  requestAnimationFrame(animate)
  updateScene(deltaTime)
  renderer.render(scene, camera)

}
animate()
function updateScene(deltaTime: number) {
  elapsedTime += deltaTime
  const x = elapsedTime * (Math.PI / 5);
  const camDisplacement = Math.sin(x)
  const bgDisplacement = Math.sin(x-0.3)
  camera.position.setZ(camera.position.z - camDisplacement)
  staticBackground.position.setZ(staticBackground.position.z - bgDisplacement)
}