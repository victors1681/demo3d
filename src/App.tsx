import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";

import { OrbitControls } from "@react-three/drei";
import Scene from "./components/scene/Scene";
import { Vector3, Color } from "three";
import { PerformanceMonitor, Environment, Grid } from "@react-three/drei";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <Canvas
      shadows
      flat
      linear
      ref={canvasRef}
      camera={{ position: [10, 5, 10] }}
    >
      <PerformanceMonitor onDecline={() => false} />
      <ambientLight color={0x404040} intensity={5} />
      <directionalLight
        color={0x404040}
        position={new Vector3(0, -70, 100).normalize()}
      />
      <directionalLight
        color={0x404040}
        position={new Vector3(0, 70, 100).normalize()}
      />
      <fog attach="fog" args={["gray", 15, 21.5]} />
      <OrbitControls
        makeDefault={true}
        enablePan={true}
        enableRotate={true}
        autoRotate
      />
      <Scene canvasRef={canvasRef} />
      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={new Color(0.5, 0.5, 10)}
        fadeDistance={30}
      />
      <Environment background preset="sunset" blur={0.8} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}

export default App;
