import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from "react-responsive";
import Experience from './Experience'

const Canvas3DVideo = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Canvas
      shadows
      camera={{ position: isMobile ? [0, 0, 145] : [0, 0, 30], fov: 50}}
      className="w-full h-full"
    >
      <Experience />
    </Canvas>
  )
}

export default Canvas3DVideo
