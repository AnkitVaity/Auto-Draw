import logo from './logo.svg';
import './App.css';

import Tooltip from '@mui/material/Tooltip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { useCallback, useEffect, useRef, useState } from 'react';
import { padding } from '@mui/system';

function App() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    if(canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, [])

  const colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue"
  ]

  const [selectedColor, setSelectedColor] = useState("white");
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({x:0, y:0});

  const draw = useCallback((x, y) => {
    console.log(selectedColor)
    if(mouseDown) {
      console.log("draw", ctx)
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = 7;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y)
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({x, y})
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])

  const onMouseDown = (e) => {
    setPosition({x: e.pageX - 567, y: e.pageY})
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX - 567, e.pageY)
  }

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  // console.log(mouseDown, lastPosition);

  return (
    <div className="App">
      <div></div>
      <div className="Main_Container">

        <div className="colors_div">
          <Tooltip title="White">
            <div className="c1" onClick = {() => setSelectedColor('#EAE5E8')}></div>
          </Tooltip>
          <Tooltip title="Lemon Yellow">
            <div className="c2" onClick = {() => setSelectedColor('#FAD400')}></div>
          </Tooltip>
          <Tooltip title="Yellow">
            <div className="c3" onClick = {() => setSelectedColor('#FFD100')}></div>
          </Tooltip>
            <div className="c4"></div>
          <Tooltip title="Scarlet Red">
            <div className="c5" onClick = {() => setSelectedColor('#FE0000')}></div>
          </Tooltip>
          <Tooltip title="Apricot Color">
            <div className="c6" onClick = {() => setSelectedColor('#FFD7C5')}></div>
          </Tooltip>
          <Tooltip title="Deep Pink">
            <div className="c7" onClick = {() => setSelectedColor('#FF0052')}></div>
          </Tooltip>
          <Tooltip title="Red">
            <div className="c8"onClick = {() => setSelectedColor('#E10003')}></div>
          </Tooltip>
          <Tooltip title="Maroon">
            <div className="c9" onClick = {() => setSelectedColor('#AF011A')}></div>
          </Tooltip>
          <Tooltip title="Purple">
            <div className="c10" onClick = {() => setSelectedColor('#B40EBD')}></div>
          </Tooltip>
          <Tooltip title="Blue">
            <div className="c11" onClick = {() => setSelectedColor('#0677F8')}></div>
          </Tooltip>
          <Tooltip title="Cyan">
            <div className="c12" onClick = {() => setSelectedColor('#49E3FF')}></div>
          </Tooltip>
            <div className="c13"></div>
            <div className="c14"></div>
          <Tooltip title="Turquoise">
            <div className="c15" onClick = {() => setSelectedColor('#00CABB')}></div>
          </Tooltip>
          <Tooltip title="Green">
            <div className="c16" onClick = {() => setSelectedColor('#008265')}></div>
          </Tooltip>
            <div className="c17"></div>
          <Tooltip title="Lime Green">
            <div className="c18" onClick = {() => setSelectedColor('#9FCA00')}></div>
          </Tooltip>
          <Tooltip title="Aquamarine">
            <div className="c19" onClick = {() => setSelectedColor('#00E7B2')}></div>
          </Tooltip>
          <Tooltip title="Orange">
            <div className="c20" onClick = {() => setSelectedColor('#E88814')}></div>
          </Tooltip>
          <Tooltip title="Brown">
            <div className="c21" onClick = {() => setSelectedColor('#AC3B03')}></div>
          </Tooltip>
          <Tooltip title="Dark Brown">
            <div className="c22" onClick = {() => setSelectedColor('#41281D')}></div>
          </Tooltip>
          <Tooltip title="Gray">
            <div className="c23" onClick = {() => setSelectedColor('#889CA7')}></div>
          </Tooltip>
          <Tooltip title="Black">
            <div className="c24" onClick = {() => setSelectedColor('#111016')}></div>
          </Tooltip>
        </div>

        <canvas
          style={{
            // border: "1px solid red"
          }}
          ref={canvasRef}

          width = {800}
          height = {800}

          onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />

      {/* <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {
          colors.map(
            color => <option key={color} value={color}>{color}</option>
          )
        }
      </select>
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button> */}
          <div style={{ paddingRight: '20px'}}>
          <br/>
            <Tooltip title="Clear">
              <RestartAltIcon sx={{ fontSize: 60, color: 'white', opacity: '0.9' }} onClick = {clear}/>
            </Tooltip>
            <br/>
            <br/>
            <Tooltip title="Download">
              <SaveAltIcon sx={{ fontSize: 60, color: 'white', opacity: '0.9' }} onClick = {download}/>
            </Tooltip>
          </div>
      </div>
    </div>
  );
}

export default App;
