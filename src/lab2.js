import React, { Component } from "react";
import functionPlot from "function-plot";

const root = document.querySelector("#root");

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
  state = {
    angle: 1,
    circlyCenterX: 0,
    circlyCenterY: 0,
    scaleX: 1,
    scaleY: 1,
    mirrorAxis: true,
    shiftX: 1,
    shiftY: 1,
    ourMatrix: [[-2, 2, 1], [2, 2, 1], [-0.5, 0.5, 1], [-2, -2, 1]],
    ourMatrix2: [[-2, 2, 2], [2, 2, 2], [-0.5, 0.5, 2], [-2, -2, 2]]
  };

  componentDidMount() {
    const { ourMatrix, ourMatrix2 } = this.state;
    functionPlot({
      target: root,
      xAxis: { domain: [-12, 12] },
      data: [
        {
          points: [...ourMatrix, ourMatrix[0]],
          fnType: "points",
          graphType: "polyline",
          color: "green"
        }
      ]
    });
  }

  rotation = () => {
    const lol = [[-2, 2, 1], [2, 2, 1], [-0.5, 0.5, 1], [-2, -2, 1]]
    var timerId = setInterval(async () => {
      const {
        angle,
        ourMatrix,
        ourMatrix2,
        circlyCenterX,
        circlyCenterY
      } = this.state;
      const aroundDot1 = [
        [1, 0, 0],
        [0, 1, 0],
        [circlyCenterX, circlyCenterY, 1]
      ];
      const aroundDot2 = [
        [1, 0, 0],
        [0, 1, 0],
        [-circlyCenterX, -circlyCenterY, 1]
      ];
      const newRotate1 = [
        [Math.cos((angle * Math.PI) / 180), 0,-1 * Math.sin((angle * Math.PI) / 180)],
        [0, 1, 0],
        [
           Math.sin((angle * Math.PI) / 180),
          0,
          Math.cos((angle * Math.PI) / 180)
        ]
      ];
      const newRotate2 = [
        [1, 0, 0],
        [
          0,
          Math.cos((angle * Math.PI) / 180),
          -1 * Math.sin((angle * Math.PI) / 180)
        ],
        [0, Math.sin((angle * Math.PI) / 180), Math.cos((angle * Math.PI) / 180)]
      ];

      const newRotate3 = [
        [ Math.cos((angle * Math.PI) / 180),  -1 * Math.sin((angle * Math.PI) / 180), 0],
        [
          Math.sin((angle * Math.PI) / 180),
          Math.cos((angle * Math.PI) / 180),
          0
        ],
        [0, 0, 1]
      ];

      const a1 = multiply(ourMatrix, aroundDot2);
      const b1 = multiply(a1, newRotate1);
      const d1 = multiply(b1, newRotate2);
      const e1 = multiply(d1, newRotate3);
      const c1 = multiply(e1 , aroundDot1);
  
      const a2 = multiply(ourMatrix2, aroundDot2);
      const b2 = multiply(a2, newRotate1);
      const d2 = multiply(b2, newRotate2);
      const e2 = multiply(d2, newRotate3);
      const c2 = multiply(e2 , aroundDot1);
  
  
      functionPlot({
        target: root,
        xAxis: { domain: [-12, 12] },
        data: [
          {
            points: [...c1, c1[0]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          },
          {
            points: [...c2, c2[0]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          },
  
          {
            points: [c1[1], c2[1]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          },
          {
            points: [c1[2], c2[2]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          },
          {
            points: [c1[3], c2[3]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          },
          {
            points: [c1[0], c2[0]],
            fnType: "points",
            graphType: "polyline",
            color: "green"
          }
        ]
      });
    this.setState({
        ourMatrix: c1,
        ourMatrix2: c2
      });
    }, 10);
    
  };

  scale = () => {
    const { ourMatrix, scaleX, scaleY } = this.state;
    const aroundDot = [[scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]];
    console.log(aroundDot);
    const resultMatrix = multiply(ourMatrix, aroundDot);
    console.log(resultMatrix);
    functionPlot({
      target: root,
      xAxis: { domain: [-24, 24] },
      data: [
        {
          points: [...resultMatrix, resultMatrix[0]],
          fnType: "points",
          graphType: "polyline"
        }
      ]
    });
    this.setState({
      ourMatrix: resultMatrix
    });
  };

  reflection = () => {
    const { ourMatrix, mirrorAxis } = this.state;
    let mirrorX, mirrorY;
    if (mirrorAxis) {
      mirrorX = -1;
      mirrorY = 1;
    } else {
      mirrorX = 1;
      mirrorY = -1;
    }
    const aroundDot = [[mirrorX, 0, 0], [0, mirrorY, 0], [0, 0, 1]];
    console.log(aroundDot);
    const resultMatrix = multiply(ourMatrix, aroundDot);
    console.log(resultMatrix);
    functionPlot({
      target: root,
      xAxis: { domain: [-24, 24] },
      data: [
        {
          points: [...resultMatrix, resultMatrix[0]],
          fnType: "points",
          graphType: "polyline"
        }
      ]
    });
    this.setState({
      ourMatrix: resultMatrix
    });
  };

  shift = () => {
    const { ourMatrix, shiftX, shiftY } = this.state;
    const aroundDot = [[1, 0, 0], [0, 1, 0], [shiftX, shiftY, 1]];
    console.log(aroundDot);
    console.log(ourMatrix);
    const resultMatrix = multiply(ourMatrix, aroundDot);
    console.log(resultMatrix);
    functionPlot({
      target: root,
      xAxis: { domain: [-24, 24] },
      data: [
        {
          points: [...resultMatrix, resultMatrix[0]],
          fnType: "points",
          graphType: "polyline"
        }
      ]
    });
    this.setState({
      ourMatrix: resultMatrix
    });
  };

  onChange = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  mirrorX = e => {
    this.setState({
      mirrorAxis: false
    });
  };

  mirrorY = e => {
    this.setState({
      mirrorAxis: true
    });
  };

  render() {
    const {
      angle,
      circlyCenterX,
      circlyCenterY,
      scaleX,
      scaleY,
      shiftX,
      shiftY
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div>
              <label htmlFor="">Введите угол</label>
              <br />
              <input
                className="form-control"
                type="text"
                name="angle"
                onChange={this.onChange}
                value={angle}
              />
            </div>

            <div>
              <label htmlFor="">Введите центр вращения X</label>
              <br />
              <input
                className="form-control"
                type="text"
                name="circlyCenterX"
                onChange={this.onChange}
                value={circlyCenterX}
              />
            </div>

            <div>
              <label htmlFor="">Введите центр вращения Y</label>
              <br />
              <input
                className="form-control"
                type="text"
                name="circlyCenterY"
                onChange={this.onChange}
                value={circlyCenterY}
              />
            </div>
            <button className="btn btn-outline-success" onClick={this.rotation}>
              ROTATE
            </button>
          </div>

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
              SCALE
            </button>
          </div>

          <div className="col-md-3">
            <div>
              <label htmlFor="">Отразить по X или Y</label>
              <br />
              <input
                type="radio"
                name="mirrorAxis"
                className=" "
                onChange={this.mirrorX}
              />
              <input
                type="radio"
                name="mirrorAxis"
                float="right"
                onChange={this.mirrorY}
              />
            </div>
            <button
              className="btn btn-outline-success"
              onClick={this.reflection}
            >
              REFLECTION
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
              SHIFT
            </button>
          </div>
        </div>
        <div id="plot" />
      </div>
    );
  }
}

export default App;
