import React, { useState, useEffect, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import { SketchPicker } from "react-color";
import rough from "roughjs/bin/rough";
import circle from "../assets/circle.svg"
import color from "../assets/color.svg"
function CanvasArea() {
 const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
 const [stageWidth, setStageWidth] = useState(window.innerWidth);
 const [stageHeight, setStageHeight] = useState(window.innerHeight);
 const [color, setColor] = useState("#000000");
 const canvasRef = useRef(null);
 const [showColor,setShowColor]=useState(false)

 const handleResize = () => {
    setStageWidth(window.innerWidth);
    setStageHeight(window.innerHeight);
 };

 useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
 }, []);

 const drawCircle = () => {
    const rc = rough.canvas(canvasRef.current);
    rc.circle(stageWidth / 2, stageHeight / 2, 100, { fill: color });
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className=" flex flex-row justify-between gap-14">
      <button
        className="btn btn-ghost text-white font-bold rounded"
        onClick={drawCircle}
      >
        <img src={circle} alt="draw circle" className=" h-12 w-12 p-1" />
      </button>
      <button onClick={() => setShowColor(!showColor)} className=" btn btn-ghost text-white font-bold rounded">
      <img src={color} alt="draw circle" className=" h-12 w-12 p-1" />
      </button>
      </div>
      {showColor &&
      <SketchPicker
        color={color}
        onChangeComplete={(c) => setColor(c.hex)}
        className="mt-4"
      />}
      
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Type some text..."
        className="mt-4 p-2 border border-gray-300"
      />
      <canvas ref={canvasRef} width={stageWidth} height={stageHeight} className="mt-4 border border-gray-300"></canvas>
    </div>
 );
}

export default CanvasArea;
