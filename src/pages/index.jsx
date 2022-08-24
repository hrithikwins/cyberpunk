import * as THREE from "three"
import React, { Suspense, useState, useMemo, useCallback, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree, } from "@react-three/fiber"
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { ManInSuit } from "../components/man_in_suit"
import { PubG } from "../components/Pubg"
import { ParkScene } from "../components/ParkScene"
import { Physics, useBox, usePlane } from "@react-three/cannon"
import CameraControls from 'camera-controls'
import { useControls } from 'leva'

// function Rig() {
//   return useFrame((state) => {
//     state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
//     state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
//   })
// }

export default function Index() {
  const [manPosition, setManPosition] = useState([0, 0, 0]);
  const handleKeyPress = useCallback((event) => {
    setManPosition([manPosition[0] + 10, manPosition[1], manPosition[2]])
    console.log(`Key pressed: ${event.key}`);
    // setManPosition([(event.key === "w" ? manPosition[0] + 1 : manPosition[0], event.key === "a" ? manPosition[1] + 1 : manPosition[0], manPosition[2])]);
  }, []);
  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);
    console.log("keydown");

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  const { model } = useControls({
    model: {
      value: 'Day', options: [
        "Day", "Night"
      ]
    }
  })

  function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
    return useFrame((state, delta) => {
      zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
      zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

      state.camera.position.lerp(pos, 0.5)
      state.camera.updateProjectionMatrix()

      controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
      return controls.update(delta)
    })
  }

  return (
    <>
      <span>{manPosition}</span>
      <Canvas
        // camera={{ position: [manPosition[0] + 10, manPosition[1], manPosition[2]], }}

        camera={{ position: [0, 5, -10], }}
        // concurrent={true} shadowMap={true}

        style={{ height: "100vh", width: "100%" }}>
        {/* <PerspectiveCamera
          args={[75, window.innerWidth / window.innerHeight, 0.1, 1000]}
          near={20}
          lookAt={[0, 0, 0]}
        /> */}

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
        {/* <meshBasicMaterial /> */}
        <Html
          style={{
            transition: 'all 0.2s',
            position: 'absolute',
            top: 0,
            right: 50,
          }}
          distanceFactor={1.5}
          position={[10, 4, 0.81]}
          transform
          occlude
        >

          <button style={{ position: "fixed", bottom: 120, right: 120 }} onClick={() => { setManPosition([manPosition[0] + 10, manPosition[1], manPosition[2]]) }}>W</button>
          <button style={{ position: "fixed", bottom: 100, right: 140 }} onClick={() => setManPosition([manPosition[0], manPosition[1], manPosition[2]])}>A</button>
          <button style={{ position: "fixed", bottom: 100, right: 120 }} onClick={() => setManPosition([manPosition[0], manPosition[1], manPosition[2]])}>S</button>
          <button style={{ position: "fixed", bottom: 100, right: 100 }} onClick={() => setManPosition([manPosition[0], manPosition[1], manPosition[2]])}>D</button>
          <button>Size</button>
          <iframe width="1904" height="705" src="https://www.youtube.com/embed/KPEmBzlSU2I" title="If the Universe Formed from Nothing, Who Created the Nothing?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Html>

        <Physics>
          {/* <Cube /> */}

          <InnerComponents position={manPosition} setPosition={setManPosition} />
          <Plane rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]} />
          {/* <group scale={[0.02, 0.02, 0.02]} position={[0, -1, 0]}>
            <ParkScene />

          </group> */}
          {/* <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow >
          <planeBufferGeometry args={[10, 10, 1, 1]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
        <Rig /> */}

        </Physics>
        {/* <Controls zoom={[0, 0, 0]} focus={manPosition} /> */}
        <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} />

      </Canvas>
    </>
  )
}

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

function Cloud({ momentsData, zoomToView }) {
  return momentsData.map(({ position, color }, i) => (
    <mesh key={i} position={position} onClick={(e) => zoomToView(e.object.position)}>
      <boxGeometry args={[0.1, 0.08, 0.003]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ))
}


const InnerComponents = ({ position, setPosition }) => {
  const [ref] = useBox(() => ({ mass: 8 }));

  // const controls = useRef();
  // const [xPos, setXPos] = useState(0);
  useFrame((state) => setPosition(() => position[0] > 1000 ? [0, 0, 0] : [position[0] + 1, position[1], position[2]]));
  // useFrame(state) => ;
  return (
    <group position={[0, 0, 0]}
      ref={ref}
      scale={[0.01, 0.01, 0.01]}
    >
      <Suspense fallback={null}>
        <ManInSuit
          position={position}
          rotation={[0, 0, 0]}
        />
        {/* <PubG /> */}
        {/* <Model /> */}
      </Suspense>


    </group>
  );
}

const Plane = (props) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
}


const Cube = () => {
  const [ref] = useBox(() => ({ mass: 1 }));
  return (
    <>

      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
      </mesh >
    </>
  );
}