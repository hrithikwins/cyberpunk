import * as THREE from "three"
import React, { Suspense, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { ManInSuit } from "../components/man_in_suit"
import { PubG } from "../components/Pubg"
import { ParkScene } from "../components/ParkScene"
// function Rig() {
//   return useFrame((state) => {
//     state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
//     state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
//   })
// }

export default function Index() {
  const [manPosition, setManPosition] = useState([0, 0, 0]);

  return (
    <Canvas
      // concurrent={true} shadowMap={true}
      // camera={{ position: [2, 4.5, 2.5], fov: 502 }}
      style={{ height: "100vh", width: "100vw" }}>
      {/* <ambientLight /> */}
      {/* <directionalLight color="red" position={[0, 120, 20]} castShadow={true} /> */}
      <directionalLight position={[0, 100, 100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[-100, 100, 100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[100, -100, 100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[100, 100, -100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[-100, -100, 100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[0, -100, -100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[-100, 100, -100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <directionalLight position={[-100, -100, -100]} color={0xffffff} intensity={0.8} castShadow={true} />
      <InnerComponents />

      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <OrbitControls />
      {/* <Rig /> */}
    </Canvas>
  )
}


const InnerComponents = () => {

  // const controls = useRef();
  const [xPos, setXPos] = useState(0);
  // useFrame((state) => controls.current.update());
  useFrame((state) => setXPos(() => xPos > 1000 ? 0 : xPos + 1));
  return (
    <group position={[0, -5, 0]}>
      <Suspense fallback={null}>
        <ManInSuit
          position={[xPos, 15, 10]} angle={0.3}

        />
        {/* <PubG /> */}
        <ParkScene />
        {/* <Model /> */}
      </Suspense>

    </group>
  );
}