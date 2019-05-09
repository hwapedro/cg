var scene, renderer, camera, cube, torus;
var controls;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  clock = new THREE.Clock();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make the camera look at the point of origin
  renderer = new THREE.WebGLRenderer({ antialias: true });
  var devicePixelRatio = window.devicePixelRatio || 1; // To handle high pixel density displays
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //torus
  var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.5,
    premultipliedAlpha: true,
    transparent: true
  });

  torus = new THREE.Mesh(geometry, material);
  torus.position.z = 4;
  torus.rotation.y = 3.5;
  scene.add(torus);

  //smoke, light, text

  light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(-1, 0, 1);
  scene.add(light);

  textGeo = new THREE.PlaneGeometry(25, 25);
  THREE.ImageUtils.crossOrigin = ""; //Need this to pull in crossdomain images from AWS
  textTexture = THREE.ImageUtils.loadTexture(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png"
  );
  textMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 1,
    map: textTexture,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  text = new THREE.Mesh(textGeo, textMaterial);
  text.position.z = 50;
  scene.add(text);

  smokeTexture = THREE.ImageUtils.loadTexture(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
  );
  smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0xee82ee,
    map: smokeTexture,
    transparent: true,
    side: THREE.DoubleSide
  });
  smokeGeo = new THREE.PlaneGeometry(70, 70);
  smokeParticles = [];
  const shadowCount = 15;
  for (p = 0; p < shadowCount; p++) {
    var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(
      Math.random() * 70 - 35,
      Math.random() * 70 - 35,
      Math.random() * 33 + 12
    );
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }



  pivotPoint = new THREE.Object3D();
  torus.add(pivotPoint);

  //square with rainbow

  let x1 = 0;
  let y1 = 2;
  let x2 = 1.5;
  let y2 = 1.5;
  let x3 = 2;
  let y3 = 0;
  let x4 = 1.5;
  let y4 = -1.5;
  let x5 = 0;
  let y5 = -2;
  let x6 = -2;
  let y6 = 0;
  let x7 = -1.5;
  let y7 = -1.5;
  let x8 = -1.5;
  let y8 = 1.5;

  square = new THREE.Geometry();

  square.vertices.push(new THREE.Vector3(x3, 0 - 2, 2));
  square.vertices.push(new THREE.Vector3(x3, 0 - 2, -2));
  square.vertices.push(new THREE.Vector3(x6, 0 - 2, -2));
  square.vertices.push(new THREE.Vector3(x6, 0 - 2, 2));
  square.vertices.push(new THREE.Vector3(x3, 0 - 2, 2));
  -2;
  square.vertices.push(new THREE.Vector3(x3, 4 - 2, 2));
  square.vertices.push(new THREE.Vector3(x3, 4 - 2, -2));
  square.vertices.push(new THREE.Vector3(x6, 4 - 2, -2));
  square.vertices.push(new THREE.Vector3(x6, 4 - 2, 2));
  square.vertices.push(new THREE.Vector3(x3, 4 - 2, 2));
  -2;
  square.vertices.push(new THREE.Vector3(x3, 4 - 2, -2));
  square.vertices.push(new THREE.Vector3(x3, 0 - 2, -2));
  -2;
  square.vertices.push(new THREE.Vector3(x6, 0 - 2, -2));
  square.vertices.push(new THREE.Vector3(x6, 4 - 2, -2));
  -2;
  square.vertices.push(new THREE.Vector3(x6, 4 - 2, 2));
  square.vertices.push(new THREE.Vector3(x6, 0 - 2, 2));
  const materialeightLine = new THREE.MeshBasicMaterial({
    color: "#000000",
    side: THREE.DoubleSide
  });
  qvadratLines = new THREE.Line(square, materialeightLine);

  var eight = new THREE.Geometry();
  const material1lab = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    vertexColors: THREE.FaceColors
  });
  var color = new THREE.Color("hsl(543, 50%, 60%)");
  eight.vertices.push(new THREE.Vector3(x1, 0 - 2, y1));
  eight.vertices.push(new THREE.Vector3(x2, 0 - 2, y2));
  eight.vertices.push(new THREE.Vector3(x3, 0 - 2, y3));
  eight.vertices.push(new THREE.Vector3(x4, 0 - 2, y4));
  eight.vertices.push(new THREE.Vector3(x5, 0 - 2, y5));
  eight.vertices.push(new THREE.Vector3(x6, 0 - 2, y6));
  eight.vertices.push(new THREE.Vector3(x7, 0 - 2, y7));
  eight.vertices.push(new THREE.Vector3(x8, 0 - 2, y8));
  eight.vertices.push(new THREE.Vector3(0, 4 - 2, 0));

  eight.faces.push(new THREE.Face3(0, 1, 2, null, color));
  eight.faces.push(new THREE.Face3(1, 2, 3, null, color));
  eight.faces.push(new THREE.Face3(2, 3, 4, null, color));
  eight.faces.push(new THREE.Face3(3, 4, 5, null, color));
  eight.faces.push(new THREE.Face3(4, 5, 6, null, color));
  eight.faces.push(new THREE.Face3(5, 6, 7, null, color));
  eight.faces.push(new THREE.Face3(6, 7, 0, null, color));
  eight.faces.push(new THREE.Face3(0, 2, 4, null, color));
  eight.faces.push(new THREE.Face3(0, 6, 4, null, color));

  var color = new THREE.Color("hsl(343, 70%, 60%)");
  eight.faces.push(new THREE.Face3(0, 1, 8, null, color));

  var color = new THREE.Color("hsl(643, 50%, 60%)");
  eight.faces.push(new THREE.Face3(1, 2, 8, null, color));

  var color = new THREE.Color("hsl(443, 80%, 60%)");
  eight.faces.push(new THREE.Face3(2, 3, 8, null, color));

  var color = new THREE.Color("hsl(143, 50%, 60%)");
  eight.faces.push(new THREE.Face3(3, 4, 8, null, color));

  var color = new THREE.Color("hsl(43, 80%, 60%)");
  eight.faces.push(new THREE.Face3(4, 6, 8, null, color));

  var color = new THREE.Color("hsl(233, 50%, 60%)");
  eight.faces.push(new THREE.Face3(5, 6, 8, null, color));

  var color = new THREE.Color("hsl(923, 60%, 50%)");
  eight.faces.push(new THREE.Face3(5, 6, 8, null, color));

  var color = new THREE.Color("hsl(3, 60%, 50%)");
  eight.faces.push(new THREE.Face3(5, 7, 8, null, color));

  var color = new THREE.Color("hsl(233, 70%, 50%)");
  eight.faces.push(new THREE.Face3(0, 7, 8, null, color));

  cubelab = new THREE.Mesh(eight, material1lab);

  qvadratLines.add(cubelab);
  qvadratLines.position.set(15, 0, 6);
  pivotPoint.add(qvadratLines);

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
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/lab7/textures/1.jpg",
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/lab7/textures/fullsize.jpg",
  "file:///C:/Users/HIKKAPEDRO/Desktop/%D0%A2%D0%A3%D0%A1%D0%A3%D0%A0/%D0%9A%D0%9E%D0%9C%D0%9F_%D0%93%D0%A0%D0%90%D0%A4/lab3/public/lab7/textures/1519565549130199587.jpg"
];
var textureToShow = 0;

// Load the first texture
// var texture = loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/MarbleSurface.jpg');

// Instantiate the material we will be using
var material = new THREE.MeshLambertMaterial();
// Instantiate a geometry to use
var geometry = new THREE.BoxGeometry(5, 5, 5);
// Instatiate the mesh with the geometry and material

cube = new THREE.Mesh(geometry, material);
cube.position.y = 10;

// Then load the texture
loader.load(arr[textureToShow], function(tex) {
  console.log(arr[textureToShow]);
  // Once the texture has loaded
  // Asign it to the material
  material.map = tex;
  // Update the next texture to show
  textureToShow++;
  // Add the mesh into the scene
  // scene.add(cube);
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

// var lastDownTarget, canvas;
// window.onload = function() {
//   canvas = document.getElementById("canvas");

//   document.addEventListener(
//     "mousedown",
//     function(event) {
//       lastDownTarget = event.target.localName;
//     },
//     false
//   );

//   document.addEventListener(
//     "keydown",
//     function(event) {
//       console.log(sunTime);
//     },
//     false
//   );
// };

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.004;
  // cube.rotation.y += 0.004;

  delta = clock.getDelta();
  evolveSmoke();
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  var time = Date.now() * 0.0005;
  torus.position.x = Math.cos(time * 10) * 2;
  torus.position.y = Math.cos(time * 7) * 1;
  torus.position.z = Math.cos(time * 8) * 3;

  pivotPoint.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate();

function evolveSmoke() {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2;
  }
}
