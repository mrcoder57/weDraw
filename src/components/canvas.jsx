import React, { useState, useEffect, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import { SketchPicker } from "react-color";
import CanvasDraw from "react-canvas-draw";
import rough from "roughjs/bin/rough";

import circle from "../assets/circle.svg";
import colour from "../assets/color.svg";
import closeIcon from "../assets/close.svg";

import eraser from "../assets/eraser.svg"
function CanvasArea() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef(null);
  const [showColor, setShowColor] = useState(false);

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

  const clearCanvas = () => {
    canvasRef.current.clear();
  };
  const drawCircle = () => {
    const canvasDraw = canvasRef.current;
    canvasDraw.brushRadius = 50;
    canvasDraw.brushColor = color;
   };
   
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-row justify-between gap-14">
        <button
          className="btn btn-ghost text-white font-bold rounded"
          onClick={drawCircle}
        >
          <img src={circle} alt="draw circle" className="h-12 w-12 p-1" />
        </button>
        <button
          className="btn btn-ghost text-white font-bold rounded"
          onClick={clearCanvas}
        >
          <img src={eraser} alt="draw circle" className="h-12 w-12 p-1" />
        </button>
        <button
          onClick={() => setShowColor(!showColor)}
          className="btn btn-ghost text-white font-bold rounded"
        >
          <img src={colour} alt="draw circle" className="h-12 w-12 p-1" />
        </button>
      </div>
      {showColor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={()=>setShowColor(!showColor)}
            >
              <img src={closeIcon} alt="" className=" h-16 w-16"/>
            </button>
            <SketchPicker
              color={color}
              onChangeComplete={(c) => setColor(c.hex)}
              className="mt-4"
            />
          </div>
        </div>
      )}

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder=""
        className="mt-4 p-2 border border-gray-300"
      />

      <CanvasDraw
        ref={canvasRef}
        canvasWidth={stageWidth}
        canvasHeight={stageHeight}
        brushColor={color}
        lazyRadius={0}
        brushRadius={3}
        hideGrid
        className="mt-4 border border-gray-300"
      />
    </div>
  );
}

export default CanvasArea;
