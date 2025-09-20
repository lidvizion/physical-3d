import { OrbitControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import Character from "./Character"
import VideoBackground from "./VideoBackground"

export default function Experience() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay blocked:", err)
        })
      }
    }
    startVideo()

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <>
      <ambientLight intensity={5} />
      <VideoBackground videoRef={videoRef} />
      <Character videoRef={videoRef} />
      <OrbitControls />
    </>
  )
}
