var scene, renderer, camera;
var cube;
var controls;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setClearColor("#ffffff");
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

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
    color:"#000000",
    side: THREE.DoubleSide
  });
  cube2 = new THREE.Line(eight2, material2);

  cube.position.set(0, 0, 0);
  scene.add(cube);
  scene.add(cube2);

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);

  camera.position.z = 6;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // var gridXZ = new THREE.GridHelper(100, 10);
  // gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
  // scene.add(gridXZ);
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.004;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.004;
  renderer.render(scene, camera);
}
