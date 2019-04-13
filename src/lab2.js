
import React, { Component } from "react";
import * as THREE from "three";
let timerId;
function multiply(a, b) {
  let aNumRows = a.length,
    aNumCols = a[0].length,
    bNumRows = b.length,
    bNumCols = b[0].length,
    m = new Array(aNumRows); // initialize array of rows
  for (let r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (let c = 0; c < bNumCols; ++c) {
      m[r][c] = 0; // initialize the current cell
      for (let i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  state = {
    angleB: 20,
    shiftXa: 1,
    shiftYa: 1,
    shiftX: 1,
    shiftY: 1,
    scaleX: 1,
    scaleY: 1,
    scaleXb: 1,
    scaleYb: 1,
    rotateClockwise: true,
    stop: false,
    clock: -1,
    angle: 0.4,
    work: false,
    //b
    x1: -20,
    y1: 2,
    x2: -18.5,
    y2: 1.5,
    x3: -18,
    y3: 0,
    x4: -18.5,
    y4: -1.5,
    x5: -20,
    y5: -2,
    x6: -22,
    y6: 0,
    x7: -21.5,
    y7: -1.5,
    x8: -21.5,
    y8: 1.5,
    //b
    bx1: -5,
    by1: 5,
    bx2: 4,
    by2: 2,
    bx3: 0,
    by3: 0,
    bx4: 4,
    by4: -2,
    bx5: -5,
    by5: -5,

    bx6: -5,
    by6: 3.4,
    bx7: 0,
    by7: 3.4,
    bx8: 0,
    by8: 0,
    bx9: 0,
    by9: -3.4,
    bx10: -5,
    by10: -3.4
  };

  mirrorX = e => {
    this.setState({
      clock: -1
    });
  };

  mirrorY = e => {
    this.setState({
      clock: 1
    });
  };

  rotationb = () => {
    const { angleB, clock } = this.state;
    let angle = angleB;
    let matrix = [
      [this.state.bx1, this.state.by1, 1],
      [this.state.bx2, this.state.by2, 1],
      [this.state.bx3, this.state.by3, 1],
      [this.state.bx4, this.state.by4, 1],
      [this.state.bx5, this.state.by5, 1],
      [this.state.bx6, this.state.by6, 1],
      [this.state.bx7, this.state.by7, 1],
      [this.state.bx8, this.state.by8, 1],
      [this.state.bx9, this.state.by9, 1],
      [this.state.bx10, this.state.by10, 1]
    ];

    const newRotate = [
      [
        Math.cos((angle * Math.PI) / 180),

        clock * Math.sin((angle * Math.PI) / 180),
        0
      ],
      [
        clock * -1 * Math.sin((angle * Math.PI) / 180),
        Math.cos((angle * Math.PI) / 180),
        0
      ],
      [0, 0, 1]
    ];

    const aroundDot1 = [
      [1, 0, 0],
      [0, 1, 0],
      [this.state.bx3 - 0.3, this.state.by3, 1]
    ];
    const aroundDot2 = [
      [1, 0, 0],
      [0, 1, 0],
      [-(this.state.bx3 - 0.3), -this.state.by3, 1]
    ];

    const a1 = multiply(matrix, aroundDot2);
    const b1 = multiply(a1, newRotate);
    const c1 = multiply(b1, aroundDot1);

    console.log(c1);

    console.log(this.scene.children);

    for (let i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].type === "LineLoop") {
        console.log(this.scene.children[i]);
        this.scene.remove(this.scene.children[i]);
      }
    }

    var geometryoneB = new THREE.Geometry();
    geometryoneB.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));

    var geometrysecondB = new THREE.Geometry();
    geometrysecondB.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[8][0], c1[8][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[9][0], c1[9][1], 1));

    const material1 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube = new THREE.LineLoop(geometryoneB, material1);

    const material2 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube2 = new THREE.LineLoop(geometrysecondB, material2);

    this.square = cube.add(cube2);
    this.scene.add(this.square);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      bx1: c1[0][0],
      by1: c1[0][1],
      bx2: c1[1][0],
      by2: c1[1][1],
      bx3: c1[2][0],
      by3: c1[2][1],
      bx4: c1[3][0],
      by4: c1[3][1],
      bx5: c1[4][0],
      by5: c1[4][1],
      bx6: c1[5][0],
      by6: c1[5][1],
      bx7: c1[6][0],
      by7: c1[6][1],
      bx8: c1[7][0],
      by8: c1[7][1],
      bx9: c1[8][0],
      by9: c1[8][1],
      bx10: c1[9][0],
      by10: c1[9][1]
    });
  };

  rotation = () => {
    const { angle, clock } = this.state;

    let matrix = [
      [this.state.x1, this.state.y1, 1],
      [this.state.x2, this.state.y2, 1],
      [this.state.x3, this.state.y3, 1],
      [this.state.x4, this.state.y4, 1],
      [this.state.x5, this.state.y5, 1],
      [this.state.x6, this.state.y6, 1],
      [this.state.x7, this.state.y7, 1],
      [this.state.x8, this.state.y8, 1]
    ];
    const newRotate = [
      [
        Math.cos((angle * Math.PI) / 180),

        clock * Math.sin((angle * Math.PI) / 180),
        0
      ],
      [
        clock * -1 * Math.sin((angle * Math.PI) / 180),
        Math.cos((angle * Math.PI) / 180),
        0
      ],
      [0, 0, 1]
    ];

    const c1 = multiply(matrix, newRotate);

    var eight = new THREE.Geometry();

    eight.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    eight.faces.push(new THREE.Face3(0, 1, 2));
    eight.faces.push(new THREE.Face3(1, 2, 3));
    eight.faces.push(new THREE.Face3(2, 3, 4));
    eight.faces.push(new THREE.Face3(3, 4, 5));
    eight.faces.push(new THREE.Face3(4, 5, 6));
    eight.faces.push(new THREE.Face3(5, 6, 7));
    eight.faces.push(new THREE.Face3(6, 7, 0));

    const materialeight = new THREE.MeshBasicMaterial({
      color: "hsl(633, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var eight = new THREE.Mesh(eight, materialeight);

    var eightLine = new THREE.Geometry();
    eightLine.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    const materialeightLine = new THREE.MeshBasicMaterial({
      color: "#6e42f4",
      side: THREE.DoubleSide
    });

    var eightLine = new THREE.LineLoop(eightLine, materialeightLine);

    var square = new THREE.Geometry();

    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    square.faces.push(new THREE.Face3(2, 3, 0));

    const material1A = new THREE.MeshBasicMaterial({
      color: "hsl(0, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var squarewow = new THREE.Mesh(square, material1A);

    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    const materialsquare = new THREE.MeshBasicMaterial({
      color: "#ff0000",
      side: THREE.DoubleSide
    });

    var squareLine = new THREE.LineLoop(square, materialsquare);

    this.figure = eight
      .add(eightLine)
      .add(squareLine)
      .add(squarewow);

    this.scene.add(this.figure);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      x1: c1[0][0],
      y1: c1[0][1],
      x2: c1[1][0],
      y2: c1[1][1],
      x3: c1[2][0],
      y3: c1[2][1],
      x4: c1[3][0],
      y4: c1[3][1],
      x5: c1[4][0],
      y5: c1[4][1],
      x6: c1[5][0],
      y6: c1[5][1],
      x7: c1[6][0],
      y7: c1[6][1],
      x8: c1[7][0],
      y8: c1[7][1]
    });
  };

  scale = () => {
    const { scaleX, scaleY } = this.state;

    let matrix = [
      [this.state.x1, this.state.y1, 1],
      [this.state.x2, this.state.y2, 1],
      [this.state.x3, this.state.y3, 1],
      [this.state.x4, this.state.y4, 1],
      [this.state.x5, this.state.y5, 1],
      [this.state.x6, this.state.y6, 1],
      [this.state.x7, this.state.y7, 1],
      [this.state.x8, this.state.y8, 1]
    ];
    const aroundDot = [[scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]];
    console.log(aroundDot);
    const c1 = multiply(matrix, aroundDot);
    console.log(c1);
    var eight = new THREE.Geometry();

    eight.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    eight.faces.push(new THREE.Face3(0, 1, 2));
    eight.faces.push(new THREE.Face3(1, 2, 3));
    eight.faces.push(new THREE.Face3(2, 3, 4));
    eight.faces.push(new THREE.Face3(3, 4, 5));
    eight.faces.push(new THREE.Face3(4, 5, 6));
    eight.faces.push(new THREE.Face3(5, 6, 7));
    eight.faces.push(new THREE.Face3(6, 7, 0));

    const materialeight = new THREE.MeshBasicMaterial({
      color: "hsl(633, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var eight = new THREE.Mesh(eight, materialeight);
    this.scene.add(eight);

    var eightLine = new THREE.Geometry();
    eightLine.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    const materialeightLine = new THREE.MeshBasicMaterial({
      color: "#6e42f4",
      side: THREE.DoubleSide
    });

    var eightLine = new THREE.LineLoop(eightLine, materialeightLine);
    this.scene.add(eightLine);

    var square = new THREE.Geometry();

    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    square.faces.push(new THREE.Face3(2, 3, 0));

    const material1A = new THREE.MeshBasicMaterial({
      color: "hsl(0, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var square = new THREE.Mesh(square, material1A);
    this.scene.add(square);

    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    const materialsquare = new THREE.MeshBasicMaterial({
      color: "#ff0000",
      side: THREE.DoubleSide
    });

    var squareLine = new THREE.LineLoop(square, materialsquare);
    this.scene.add(squareLine);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      x1: c1[0][0],
      y1: c1[0][1],
      x2: c1[1][0],
      y2: c1[1][1],
      x3: c1[2][0],
      y3: c1[2][1],
      x4: c1[3][0],
      y4: c1[3][1],
      x5: c1[4][0],
      y5: c1[4][1],
      x6: c1[5][0],
      y6: c1[5][1],
      x7: c1[6][0],
      y7: c1[6][1],
      x8: c1[7][0],
      y8: c1[7][1]
    });
  };

  scaleb = () => {
    const { scaleXb, scaleYb } = this.state;

    let matrix = [
      [this.state.bx1, this.state.by1, 1],
      [this.state.bx2, this.state.by2, 1],
      [this.state.bx3, this.state.by3, 1],
      [this.state.bx4, this.state.by4, 1],
      [this.state.bx5, this.state.by5, 1],
      [this.state.bx6, this.state.by6, 1],
      [this.state.bx7, this.state.by7, 1],
      [this.state.bx8, this.state.by8, 1],
      [this.state.bx9, this.state.by9, 1],
      [this.state.bx10, this.state.by10, 1]
    ];
    const aroundDot = [[scaleXb, 0, 0], [0, scaleYb, 0], [0, 0, 1]];
    console.log(aroundDot);
    const c1 = multiply(matrix, aroundDot);
    console.log(c1);

    console.log(this.scene.children);

    for (let i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].type === "LineLoop") {
        console.log(this.scene.children[i]);
        this.scene.remove(this.scene.children[i]);
      }
    }

    var geometryoneB = new THREE.Geometry();
    geometryoneB.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));

    var geometrysecondB = new THREE.Geometry();
    geometrysecondB.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[8][0], c1[8][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[9][0], c1[9][1], 1));

    const material1 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube = new THREE.LineLoop(geometryoneB, material1);

    const material2 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube2 = new THREE.LineLoop(geometrysecondB, material2);

    this.square = cube.add(cube2);
    this.scene.add(this.square);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      bx1: c1[0][0],
      by1: c1[0][1],
      bx2: c1[1][0],
      by2: c1[1][1],
      bx3: c1[2][0],
      by3: c1[2][1],
      bx4: c1[3][0],
      by4: c1[3][1],
      bx5: c1[4][0],
      by5: c1[4][1],
      bx6: c1[5][0],
      by6: c1[5][1],
      bx7: c1[6][0],
      by7: c1[6][1],
      bx8: c1[7][0],
      by8: c1[7][1],
      bx9: c1[8][0],
      by9: c1[8][1],
      bx10: c1[9][0],
      by10: c1[9][1]
    });
  };

  shift = () => {
    const { shiftX, shiftY } = this.state;

    console.log(shiftX, shiftY);

    const aroundDot = [[1, 0, 0], [0, 1, 0], [shiftX, shiftY, 1]];
    let matrix = [
      [this.state.bx1, this.state.by1, 1],
      [this.state.bx2, this.state.by2, 1],
      [this.state.bx3, this.state.by3, 1],
      [this.state.bx4, this.state.by4, 1],
      [this.state.bx5, this.state.by5, 1],
      [this.state.bx6, this.state.by6, 1],
      [this.state.bx7, this.state.by7, 1],
      [this.state.bx8, this.state.by8, 1],
      [this.state.bx9, this.state.by9, 1],
      [this.state.bx10, this.state.by10, 1]
    ];

    const c1 = multiply(matrix, aroundDot);
    console.log(c1);

    for (let i = this.scene.children.length - 1; i > -1; i--) {
      if (this.scene.children[i].type === "LineLoop") {
        console.log(this.scene.children[i]);
        this.scene.remove(this.scene.children[i]);
      }
    }
    var geometryoneB = new THREE.Geometry();
    geometryoneB.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    geometryoneB.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));

    var geometrysecondB = new THREE.Geometry();
    geometrysecondB.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[8][0], c1[8][1], 1));
    geometrysecondB.vertices.push(new THREE.Vector3(c1[9][0], c1[9][1], 1));

    const material1 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube = new THREE.LineLoop(geometryoneB, material1);

    const material2 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube2 = new THREE.LineLoop(geometrysecondB, material2);

    this.square = cube.add(cube2);
    this.scene.add(this.square);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      bx1: c1[0][0],
      by1: c1[0][1],
      bx2: c1[1][0],
      by2: c1[1][1],
      bx3: c1[2][0],
      by3: c1[2][1],
      bx4: c1[3][0],
      by4: c1[3][1],
      bx5: c1[4][0],
      by5: c1[4][1],
      bx6: c1[5][0],
      by6: c1[5][1],
      bx7: c1[6][0],
      by7: c1[6][1],
      bx8: c1[7][0],
      by8: c1[7][1],
      bx9: c1[8][0],
      by9: c1[8][1],
      bx10: c1[9][0],
      by10: c1[9][1]
    });
  };

  shiftA = () => {
    const { shiftXa, shiftYa } = this.state;

    const aroundDot = [[1, 0, 0], [0, 1, 0], [shiftXa, shiftYa, 1]];

    let matrix = [
      [this.state.x1, this.state.y1, 1],
      [this.state.x2, this.state.y2, 1],
      [this.state.x3, this.state.y3, 1],
      [this.state.x4, this.state.y4, 1],
      [this.state.x5, this.state.y5, 1],
      [this.state.x6, this.state.y6, 1],
      [this.state.x7, this.state.y7, 1],
      [this.state.x8, this.state.y8, 1]
    ];

    const c1 = multiply(matrix, aroundDot);
    console.log(c1);

    var eight = new THREE.Geometry();

    eight.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eight.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    eight.faces.push(new THREE.Face3(0, 1, 2));
    eight.faces.push(new THREE.Face3(1, 2, 3));
    eight.faces.push(new THREE.Face3(2, 3, 4));
    eight.faces.push(new THREE.Face3(3, 4, 5));
    eight.faces.push(new THREE.Face3(4, 5, 6));
    eight.faces.push(new THREE.Face3(5, 6, 7));
    eight.faces.push(new THREE.Face3(6, 7, 0));

    const materialeight = new THREE.MeshBasicMaterial({
      color: "hsl(633, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var eight = new THREE.Mesh(eight, materialeight);

    var eightLine = new THREE.Geometry();
    eightLine.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[1][0], c1[1][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[3][0], c1[3][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[6][0], c1[6][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));
    eightLine.vertices.push(new THREE.Vector3(c1[7][0], c1[7][1], 1));

    const materialeightLine = new THREE.MeshBasicMaterial({
      color: "#6e42f4",
      side: THREE.DoubleSide
    });

    var eightLine = new THREE.LineLoop(eightLine, materialeightLine);

    var square = new THREE.Geometry();

    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    square.faces.push(new THREE.Face3(2, 3, 0));

    const material1A = new THREE.MeshBasicMaterial({
      color: "hsl(0, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var squarewow = new THREE.Mesh(square, material1A);

    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(c1[0][0], c1[0][1], 1));
    square.vertices.push(new THREE.Vector3(c1[2][0], c1[2][1], 1));
    square.vertices.push(new THREE.Vector3(c1[4][0], c1[4][1], 1));
    square.vertices.push(new THREE.Vector3(c1[5][0], c1[5][1], 1));

    const materialsquare = new THREE.MeshBasicMaterial({
      color: "#ff0000",
      side: THREE.DoubleSide
    });

    var squareLine = new THREE.LineLoop(square, materialsquare);

    this.figure = eight
      .add(eightLine)
      .add(squareLine)
      .add(squarewow);

    this.scene.add(this.figure);

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();

    this.setState({
      x1: c1[0][0],
      y1: c1[0][1],
      x2: c1[1][0],
      y2: c1[1][1],
      x3: c1[2][0],
      y3: c1[2][1],
      x4: c1[3][0],
      y4: c1[3][1],
      x5: c1[4][0],
      y5: c1[4][1],
      x6: c1[5][0],
      y6: c1[5][1],
      x7: c1[6][0],
      y7: c1[6][1],
      x8: c1[7][0],
      y8: c1[7][1]
    });
  };

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // фигура а восьмиугольник
    let x1 = -20;
    let y1 = 2;
    let x2 = -18.5;
    let y2 = 1.5;
    let x3 = -18;
    let y3 = 0;
    let x4 = -18.5;
    let y4 = -1.5;
    let x5 = -20;
    let y5 = -2;
    let x6 = -22;
    let y6 = 0;
    let x7 = -21.5;
    let y7 = -1.5;
    let x8 = -21.5;
    let y8 = 1.5;

    var eight = new THREE.Geometry();

    eight.vertices.push(new THREE.Vector3(x1, y1, 1.001));
    eight.vertices.push(new THREE.Vector3(x2, y2, 1.001));
    eight.vertices.push(new THREE.Vector3(x3, y3, 1.001));
    eight.vertices.push(new THREE.Vector3(x4, y4, 1.001));
    eight.vertices.push(new THREE.Vector3(x5, y5, 1.001));
    eight.vertices.push(new THREE.Vector3(x6, y6, 1.001));
    eight.vertices.push(new THREE.Vector3(x7, y7, 1.001));
    eight.vertices.push(new THREE.Vector3(x8, y8, 1.001));
    eight.faces.push(new THREE.Face3(0, 1, 2));
    eight.faces.push(new THREE.Face3(1, 2, 3));
    eight.faces.push(new THREE.Face3(2, 3, 4));
    eight.faces.push(new THREE.Face3(3, 4, 5));
    eight.faces.push(new THREE.Face3(4, 5, 6));
    eight.faces.push(new THREE.Face3(5, 6, 7));
    eight.faces.push(new THREE.Face3(6, 7, 0));

    const materialeight = new THREE.MeshBasicMaterial({
      color: "hsl(633, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var eight = new THREE.Mesh(eight, materialeight);

    var eightLine = new THREE.Geometry();
    eightLine.vertices.push(new THREE.Vector3(x1, y1, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x2, y2, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x3, y3, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x4, y4, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x5, y5, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x7, y7, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x6, y6, 1.001));
    eightLine.vertices.push(new THREE.Vector3(x8, y8, 1.001));

    const materialeightLine = new THREE.MeshBasicMaterial({
      color: "#6e42f4",
      side: THREE.DoubleSide
    });

    var eightLine = new THREE.LineLoop(eightLine, materialeightLine);

    // фигура а квадрат

    var square = new THREE.Geometry();
    console.log(square);
    square.vertices.push(new THREE.Vector3(x1, y1, 1.001));
    square.vertices.push(new THREE.Vector3(x3, y3, 1.001));
    square.vertices.push(new THREE.Vector3(x5, y5, 1.001));
    square.vertices.push(new THREE.Vector3(x6, y6, 1.001));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    square.faces.push(new THREE.Face3(2, 3, 0));

    const material1A = new THREE.MeshBasicMaterial({
      color: "hsl(0, 50%, 80%)",
      side: THREE.DoubleSide
    });

    var squarewow = new THREE.Mesh(square, material1A);

    var square = new THREE.Geometry();
    console.log(square);
    square.vertices.push(new THREE.Vector3(x1, y1, 1.001));
    square.vertices.push(new THREE.Vector3(x3, y3, 1.001));
    square.vertices.push(new THREE.Vector3(x5, y5, 1.001));
    square.vertices.push(new THREE.Vector3(x6, y6, 1.001));

    const materialsquare = new THREE.MeshBasicMaterial({
      color: "#ff0000",
      side: THREE.DoubleSide
    });

    var squareLine = new THREE.LineLoop(square, materialsquare);

    // фигура б
    x1 = -5;
    y1 = 5;
    x2 = 4;
    y2 = 2;
    x3 = 0;
    y3 = 0;
    x4 = 4;
    y4 = -2;
    x5 = -5;
    y5 = -5;

    x6 = -5;
    y6 = 3.4;
    x7 = 0;
    y7 = 3.4;
    x8 = 0;
    y8 = 0;
    let x9 = 0;
    let y9 = -3.4;
    let x10 = -5;
    let y10 = -3.4;

    var geometryoneB = new THREE.Geometry();
    geometryoneB.vertices.push(new THREE.Vector3(x1, y1, 1));
    geometryoneB.vertices.push(new THREE.Vector3(x2, y2, 1));
    geometryoneB.vertices.push(new THREE.Vector3(x3, y3, 1));
    geometryoneB.vertices.push(new THREE.Vector3(x4, y4, 1));
    geometryoneB.vertices.push(new THREE.Vector3(x5, x5, 1));

    var geometrysecondB = new THREE.Geometry();
    geometrysecondB.vertices.push(new THREE.Vector3(x6, y6, 1));
    geometrysecondB.vertices.push(new THREE.Vector3(x7, y7, 1));
    geometrysecondB.vertices.push(new THREE.Vector3(x8, y8, 1));
    geometrysecondB.vertices.push(new THREE.Vector3(x9, y9, 1));
    geometrysecondB.vertices.push(new THREE.Vector3(x10, y10, 1));

    const material1 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube = new THREE.LineLoop(geometryoneB, material1);

    const material2 = new THREE.MeshBasicMaterial({ color: "#000000" });
    var cube2 = new THREE.LineLoop(geometrysecondB, material2);

    camera.position.z = 50;

    renderer.setClearColor("#ffffff");
    renderer.setSize(width, height);

    this.square = cube.add(cube2);
    scene.add(this.square);

    this.figure = eight
      .add(eightLine)
      .add(squareLine)
      .add(squarewow);
    this.figureForRot = eight
      .add(eightLine)
      .add(squareLine)
      .add(squarewow);

    this.square = cube.add(cube2);
    scene.add(this.figure);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.material1 = material1;
    this.material2 = material2;

    this.cube = cube;
    this.cube2 = cube2;

    this.mount.appendChild(this.renderer.domElement);
    this.renderScene();
  }

  onChange = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillUnmount() {
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    this.frameId = requestAnimationFrame(this.animate);
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.state.rotateClockwise
      ? (this.figureForRot.rotation.z -= 0.002)
      : (this.figureForRot.rotation.z += 0.002);

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  handleKeyPress = event => {
    switch (event.key){
      case "1":
      if (this.state.work) {
        console.log("now working");
      } else {
        timerId = setInterval(this.rotation, 50);
        this.setState({ work: true });
      }
      break;

      case  "q":
      this.start();
      break;

      case  "e":
      this.stop();
      break;

      case  "w":
      this.setState({ rotateClockwise: !this.state.rotateClockwise });
      break;

      case  "3":
      clearInterval(timerId);
      this.setState({ work: false });
      break;

      case  "2":
      let clock = this.state.clock === -1 ? 1 : -1;
      this.setState({ clock: clock });
      break;


      default :
      break;
    }
  
  };

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const {
      scaleX,
      scaleY,
      scaleXb,
      scaleYb,
      shiftX,
      shiftY,
      shiftXa,
      shiftYa,
      angleB
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div>
                <label htmlFor="">Введите X</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="scaleX"
                  onChange={this.onChange}
                  value={scaleX}
                />
              </div>
              <div>
                <label htmlFor="">Введите Y</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="scaleY"
                  onChange={this.onChange}
                  value={scaleY}
                />
              </div>
              <button className="btn btn-outline-success" onClick={this.scale}>
                SCALE A
              </button>
            </div>

            <div className="col-md-3">
              <div>
                <label htmlFor="">Введите X</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="scaleXb"
                  onChange={this.onChange}
                  value={scaleXb}
                />
              </div>
              <div>
                <label htmlFor="">Введите Y</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="scaleYb"
                  onChange={this.onChange}
                  value={scaleYb}
                />
              </div>
              <button className="btn btn-outline-success" onClick={this.scaleb}>
                SCALE B
              </button>
            </div>
            <div className="col-md-3">
              <div>
                <label htmlFor="">Введите отступ X</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="shiftXa"
                  onChange={this.onChange}
                  value={shiftXa}
                />
              </div>

              <div>
                <label htmlFor="">Введите отступ Y</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="shiftYa"
                  onChange={this.onChange}
                  value={shiftYa}
                />
              </div>

              <button className="btn btn-outline-success" onClick={this.shiftA}>
                SHIFT A
              </button>
            </div>
            <div className="col-md-3">
              <div>
                <label htmlFor="">Введите отступ X</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="shiftX"
                  onChange={this.onChange}
                  value={shiftX}
                />
              </div>

              <div>
                <label htmlFor="">Введите отступ Y</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="shiftY"
                  onChange={this.onChange}
                  value={shiftY}
                />
              </div>

              <button className="btn btn-outline-success" onClick={this.shift}>
                SHIFT B
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <label htmlFor="">Введите угол для вращения фигуры B</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="angleB"
                  onChange={this.onChange}
                  value={angleB}
                />
              </div>

              <button
                className="btn btn-outline-success"
                onClick={this.rotationb}
              >
                ROTATE B
              </button>
            </div>
            <div>
              <div
                onKeyPress={this.handleKeyPress}
                tabIndex="0"
                style={{ outline: "none" }}
                style={{ width: "1200px", height: "900px" }}
                ref={mount => {
                  this.mount = mount;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
