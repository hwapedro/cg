var scene, renderer, camera, cube, floor, lightp;
var controls;
var sunTime = true;
var suTimeCounter = 0;
init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00000);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = -10;
  camera.position.y = 50;
  camera.position.x = -5;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make the camera look at the point of origin

  renderer = new THREE.WebGLRenderer({ antialias: true });
  var devicePixelRatio = window.devicePixelRatio || 1; // To handle high pixel density displays

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap

  //Create a PointLight and turn on shadows for the light
  var light = new THREE.AmbientLight(0xffffff, 0.2); // default false
  scene.add(light);

  lightp = new THREE.PointLight(0xffffff, 1, 100);
  lightp.position.set(-3, 9, -3);
  lightp.castShadow = true;
  lightp.shadow.camera.near = 0.5; // default
  lightp.shadow.camera.far = 500; // default
  scene.add(lightp);

  var render = function() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  };
}
// instantiate a texture loader
var loader = new THREE.TextureLoader();
//allow cross origin loading
loader.crossOrigin = "";

// The textures to use
var arr = [
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/practice7/textures/1.jpg",
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/practice7/textures/fullsize.jpg",
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/practice7/textures/1519565549130199587.jpg"
];
var textureToShow = 0;

// Load the first texture
// var texture = loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/MarbleSurface.jpg');

// Instantiate the material we will be using
var material = new THREE.MeshPhongMaterial();
// Instantiate a geometry to use
var geometry = new THREE.BoxGeometry(5, 5, 5);
// Instatiate the mesh with the geometry and material
floor = new THREE.Mesh(
  new THREE.PlaneGeometry(55, 55),
  new THREE.MeshPhongMaterial({ color: 0xffffff })
);
floor.receiveShadow = true;
floor.rotateX(-Math.PI * 0.5);
cube = new THREE.Mesh(geometry, material);
cube.position.y = 10;

cube.receiveShadow = true;
cube.castShadow = true;

// Then load the texture
loader.load(arr[textureToShow], function(tex) {
  // Once the texture has loaded
  // Asign it to the material
  material.map = tex;
  // Update the next texture to show
  textureToShow++;
  // Add the mesh into the scene
  scene.add(cube);
  scene.add(floor);
});

// Click interaction
var canvas = document.getElementsByTagName("canvas")[0];

canvas.addEventListener("click", function() {
  loader.load(arr[textureToShow], function(tex) {
    // Once the texture has loaded
    // Asign it to the material
    material.map = tex;
    // Update the next texture to show
    textureToShow++;
    // Have we got to the end of the textures array
    if (textureToShow > arr.length - 1) {
      textureToShow = 0;
    }
  });
});

var lastDownTarget, canvas;
window.onload = function() {
  canvas = document.getElementById("canvas");

  document.addEventListener(
    "mousedown",
    function(event) {
      lastDownTarget = event.target.localName;
    },
    false
  );

  document.addEventListener(
    "keydown",
    function(event) {
      console.log(sunTime);

    },
    false
  );
};

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.004;
  // cube.rotation.y += 0.004;
  lightp.position.x = 30 * Math.sin(Date.now() / 12000);
  lightp.position.y = 30 * Math.cos(Date.now() / 12000);

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();
