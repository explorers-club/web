import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { mergeBufferGeometries } from "three-stdlib";
import { BoxGeometry, CylinderGeometry, Vector2 } from "three";
import "./App.css";
import SimplexNoise from "simplex-noise";

function App() {
  return (
    <div className="App">
      <Canvas
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [0, 0, 50] }}
      >
        <color attach="background" args={["#FFEECC"]} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />

          <Terrain />
          <OrbitControls autoRotate autoRotateSpeed={0.6} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

const getHexGeometry = (height, position) => {
  let geo = new CylinderGeometry(1, 1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);

  return geo;
};

const Terrain = ({ envMap }) => {
  const hexGeometry = useMemo(() => {
    let geometries = new BoxGeometry(0, 0, 0);
    const simplex = new SimplexNoise();

    const makeHex = (height, position) => {
      let geo = getHexGeometry(height, position);
      geometries = mergeBufferGeometries([geometries, geo]);
    };

    for (let i = -15; i < 15; i++) {
      for (let j = -15; j < 15; j++) {
        const position = tileToPosition(i, j);
        if (position.length() > 16) {
          continue;
        }

        const noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
        const height = Math.pow(noise, 1.5) * 10;

        makeHex(height, position);
      }
    }

    return geometries;
  }, []);

  return (
    <mesh geometry={hexGeometry}>
      {/* <cylinderGeometry args={[1, 1, 3]} /> */}
      <meshStandardMaterial envMap={envMap} flatShading={true} />
    </mesh>
  );
};

function tileToPosition(tileX, tileY) {
  return new Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535);
}
