import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { RGBELoader } from "three-stdlib";
import { FloatType, PMREMGenerator } from "three";
import { Loader } from "@react-three/drei"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [0, 0, 50] }}
      >
        <color attach="background" args={["#FFEECC"]} />
        <Suspense fallback={null}>
          <Box />
        </Suspense>
      </Canvas>
      {/* <Loader /> */}
    </div>
  );
}

export default App;

const Box = () => {
  const { gl } = useThree();
  const pmremGenerator = useMemo(() => {
    return new PMREMGenerator(gl);
  }, [gl])

  const texture = useLoader(RGBELoader, "./assets/envmap.hdr", loader => {
    loader.setDataType(FloatType)
    
  });
  const envMap = useMemo(() => {
    if (texture) {
      return pmremGenerator.fromEquirectangular(texture).texture;
    }
  }, [texture, pmremGenerator])

  return (
    <mesh>
      <sphereGeometry args={[5, 10, 10]} />
      <meshStandardMaterial envMap={envMap} roughness={0} metalness={1} />
    </mesh>
  );
};
