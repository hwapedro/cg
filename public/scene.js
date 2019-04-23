var scene, renderer, camera;
var cube;
var controls;

var scenelab, rendererlab, cameralab;
var cubelab;
var controlslab;
var square

init();
animate();

initlab();
animatelab();

function init() {
  let scene3d = document.getElementById("practice");

  renderer = new THREE.WebGLRenderer({ antialias: true });
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setClearColor("#ffffff");
  renderer.setSize(width, height);

  scene3d.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  // фигура а восьмиугольник

  var eight = new THREE.Geometry();

  eight.vertices.push(new THREE.Vector3(-0.5, 0, -0.2));
  eight.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0, -0.2 + Math.sqrt(3) / 2)
  );
  eight.vertices.push(new THREE.Vector3(0.5, 0, -0.2));
  eight.vertices.push(new THREE.Vector3(-0.5, 0, -0.2));

  eight.vertices.push(new THREE.Vector3(-0.2, 0.5, -0.05));
  eight.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0.5, -0.57 + Math.sqrt(3) / 2)
  );
  eight.vertices.push(new THREE.Vector3(0.2, 0.5, -0.05));
  eight.vertices.push(new THREE.Vector3(-0.2, 0.5, -0.05));

  eight.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0.5, -0.57 + Math.sqrt(3) / 2)
  );
  eight.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0, -0.2 + Math.sqrt(3) / 2)
  );

  eight.vertices.push(new THREE.Vector3(0.5, 0, -0.2));
  eight.vertices.push(new THREE.Vector3(0.2, 0.5, -0.05));

  eight.faces.push(new THREE.Face3(0, 1, 2));
  eight.faces.push(new THREE.Face3(1, 2, 3));

  eight.faces.push(new THREE.Face3(4, 5, 6));
  eight.faces.push(new THREE.Face3(5, 6, 7));

  eight.faces.push(new THREE.Face3(3, 4, 5));
  eight.faces.push(new THREE.Face3(3, 5, 1));

  eight.faces.push(new THREE.Face3(3, 6, 7));
  eight.faces.push(new THREE.Face3(3, 2, 6));

  eight.faces.push(new THREE.Face3(2, 6, 1));
  eight.faces.push(new THREE.Face3(1, 6, 5));

  const material1 = new THREE.MeshBasicMaterial({
    color: "hsl(343, 50%, 60%)",
    side: THREE.DoubleSide
  });

  cube = new THREE.Mesh(eight, material1);

  var eight2 = new THREE.Geometry();

  eight2.vertices.push(new THREE.Vector3(-0.5, 0, -0.2));
  eight2.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0, -0.2 + Math.sqrt(3) / 2)
  );
  eight2.vertices.push(new THREE.Vector3(0.5, 0, -0.2));
  eight2.vertices.push(new THREE.Vector3(-0.5, 0, -0.2));

  eight2.vertices.push(new THREE.Vector3(-0.2, 0.5, -0.05));
  eight2.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0.5, -0.57 + Math.sqrt(3) / 2)
  );
  eight2.vertices.push(new THREE.Vector3(0.2, 0.5, -0.05));
  eight2.vertices.push(new THREE.Vector3(-0.2, 0.5, -0.05));

  eight2.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0.5, -0.57 + Math.sqrt(3) / 2)
  );
  eight2.vertices.push(
    new THREE.Vector3(-0.5 + 1 / 2, 0, -0.2 + Math.sqrt(3) / 2)
  );

  eight2.vertices.push(new THREE.Vector3(0.5, 0, -0.2));
  eight2.vertices.push(new THREE.Vector3(0.2, 0.5, -0.05));

  const material2 = new THREE.MeshBasicMaterial({
    color: "#000000",
    side: THREE.DoubleSide
  });
  cube2 = new THREE.Line(eight2, material2);

  cube.position.set(0, 0, 0);
  scene.add(cube);
  scene.add(cube2);

  camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 10000);

  camera.position.z = 3;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // var gridXZ = new THREE.GridHelper(100, 10);
  // gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  // scene.add(gridXZ);
}

function initlab() {
  let scene3 = document.getElementById("lab");

  rendererlab = new THREE.WebGLRenderer({ antialias: true });
  var width = window.innerWidth;
  var height = window.innerHeight;
  rendererlab.setClearColor("#ffffff");
  rendererlab.setSize(width, height);

  scene3.appendChild(rendererlab.domElement);

  scenelab = new THREE.Scene();

  // фигура а восьмиугольник

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
  scenelab.add(qvadratLines);

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

  cubelab.position.set(0, 0, 0);
  scenelab.add(cubelab);

  cameralab = new THREE.PerspectiveCamera(75, width / height,1, 10000);

  cameralab.position.z = 15;

  controlslab = new THREE.OrbitControls(cameralab, rendererlab.domElement);

  // var gridXZ = new THREE.GridHelper(100, 10);
  // gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  // scene.add(gridXZ);
}

function animatelab() {
  controlslab.update();
  requestAnimationFrame(animatelab);
  qvadratLines.rotation.y += 0.004;
  cubelab.rotation.y -= 0.004;
//   qvadratLines.rotation.x -= 0.001;
  rendererlab.render(scenelab, cameralab);
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.004;
  // cube.rotation.y += 0.004;
  // cube2.rotation.x += 0.004;
  // cube2.rotation.y += 0.004;
  renderer.render(scene, camera);
}
