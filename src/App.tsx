import {  useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
 
import { OrbitControls } from "@react-three/drei";
 import Scene from "./components/scene/Scene";
import { Vector3 } from "three";
 

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <Canvas shadows flat linear ref={canvasRef}>
      <ambientLight color={0x404040} intensity={5} />
      <directionalLight
        color={0x404040}
        position={new Vector3(0, -70, 100).normalize()}
      />
      <directionalLight
        color={0x404040}
        position={new Vector3(0, 70, 100).normalize()}
      />
      <OrbitControls makeDefault={true} enablePan={true} enableRotate={true} />

      <Scene canvasRef={canvasRef} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}

export default App;
