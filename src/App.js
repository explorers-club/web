import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { RGBELoader } from "three-stdlib";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [0, 0, 50] }}
      >
        <color attach="background" args={["#FFEECC"]} />
        <Box />
        <Suspense fallback={null}>
        </Suspense>
        {/* <ambientLight />
        <pointLight position={[10, 10, 10]} /> */}
      </Canvas>
    </div>
  );
}

export default App;

const Box = () => {
  // useLoader(RGBELoader, "./assets/envmap.hdr");

  return (
    <mesh>
      <sphereGeometry args={[5, 10, 10]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};
