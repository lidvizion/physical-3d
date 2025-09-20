import { useVideoTexture } from '@react-three/drei'
import { useEffect, MutableRefObject } from 'react'

const VideoBackground = ({ videoRef }: { videoRef: MutableRefObject<HTMLVideoElement | null> }) => {
  const texture = useVideoTexture("/videos/Restaurant Hero.mp4", {
    muted: true,
    loop: true,
    start: true,
  })

  useEffect(() => {
    if (texture.image instanceof HTMLVideoElement) {
      videoRef.current = texture.image
    }
  }, [texture, videoRef])

  return (
    <mesh scale={[8, 5.6, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[8, 5.6]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

export default VideoBackground