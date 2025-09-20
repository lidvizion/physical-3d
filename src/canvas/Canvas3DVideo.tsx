import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const Canvas3DVideo = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 30], fov: 50}}
      className="w-full h-full"
    >
      <Experience />
    </Canvas>
  )
}

export default Canvas3DVideo
