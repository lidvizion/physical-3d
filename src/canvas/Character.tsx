import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, MutableRefObject } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

const Character = ({ videoRef }: { videoRef: MutableRefObject<HTMLVideoElement | null> }) => {
  const { scene, animations } = useGLTF("/models/gingerbreadperson.glb")
  const { actions, mixer } = useAnimations(animations, scene)

  const groupRef = useRef<THREE.Group>(null!)
  console.log(actions)

  useEffect(() => {
    if (!actions || animations.length === 0) return

    const run = actions["run"]
    const heart = actions["victory"]

    // bikin timeline
    const tl = gsap.timeline({ paused: true })

    // :00–:03
    tl.call(() => {
      heart?.stop()
      run?.reset().fadeIn(0.3).play()
    }, [], 0)
    
    tl.to(groupRef.current.position, { x: -5, y:-8, duration: 3.5, ease: "power1.inOut" }, 0)
    tl.to(groupRef.current.scale, { x: 4, y: 4, z: 4, duration: 3.5, ease: "power1.inOut" }, 0)

    tl.set(groupRef.current!.position, { x: -18, y: -11 }, 3.5)
    tl.set(groupRef.current!.rotation, { y: Math.PI * 0.65 }, 3.5)
    tl.to(groupRef.current.position, { x: 8, duration: 4, ease: "power1.inOut" }, 3.5)
    
    tl.set(groupRef.current!.position, { x: -9999 }, 7.5)

    tl.set(groupRef.current!.position, { x: 9, y: -11 }, 14.5)
    tl.set(groupRef.current!.rotation, { y: Math.PI * 0.75 }, 14.5)
    tl.to(groupRef.current.position, { x: 15, y: -8, duration: 5.6, ease: "power1.inOut" }, 14.5)
    tl.to(groupRef.current.scale, { x: 2.7, y: 2.7, z: 2.7, duration: 3.6, ease: "power1.inOut" }, 14.5)
    
    tl.set(groupRef.current!.position, { x: 0, y: -10 }, 20.1)
    tl.set(groupRef.current!.rotation, { y: Math.PI * 0.9 }, 20.1)
    tl.set(groupRef.current!.scale, { x: 6, y: 6, z: 5}, 20.1)
    tl.to(groupRef.current.position, { x: 6, y: -8.3, duration: 2.4, ease: "power1.inOut" }, 20.1)
    tl.to(groupRef.current.scale, { x: 5.5, y: 5.5, z: 5.5, duration: 2.4, ease: "power1.inOut" }, 20.1)
    
    tl.call(() => {
      run?.fadeOut(0.5)
      heart?.reset().fadeIn(0.5).play()
    }, [], 22.5)
    tl.to(groupRef.current.scale, { x: 6, y: 6, z: 6, duration: 3, ease: "power1.inOut" }, 22.5)

    tl.call(() => {
      heart?.stop()
      run?.reset().play()
    }, [], 27.3)
    tl.set(groupRef.current!.position, { x: -1, y: -10 }, 27.3)
    tl.set(groupRef.current!.rotation, { y: Math.PI }, 27.3)
    tl.set(groupRef.current!.scale, { x: 8, y: 8, z: 8 }, 27.3)
    tl.to(groupRef.current.position, { y: -2, duration: 5.4, ease: "power1.inOut" }, 27.3)
    tl.to(groupRef.current.scale, { x: 4, y: 4, z: 4, duration: 3.4, ease: "power1.inOut" }, 27.3)

    tl.set(groupRef.current!.position, { x: -20, y: -13 }, 32.7)
    tl.set(groupRef.current!.rotation, { y: Math.PI }, 32.7)
    tl.set(groupRef.current!.scale, { x: 8, y: 8, z: 8 }, 32.7)
    tl.to(groupRef.current.position, { x: -19, y: -9, duration: 3, ease: "power1.inOut" }, 32.7)
    tl.to(groupRef.current.scale, { x: 6.5, y: 6.5, z: 6.5, duration: 3, ease: "power1.inOut" }, 32.7)

    tl.call(() => {
      run?.fadeOut(0.5)
      heart?.reset().fadeIn(0.5).play()
    }, [], 35.3)
    
    // sinkronisasi dengan video
    const updateTimeline = () => {
      if (videoRef.current) {
        tl.time(videoRef.current.currentTime)
      }
      requestAnimationFrame(updateTimeline)
    }
    updateTimeline()

    return () => {
      tl.kill()
    }
  }, [actions, animations, videoRef])

  useFrame((_, delta) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        mixer.timeScale = 0
      } else {
        mixer.timeScale = 1
        mixer.update(delta)
      }
    }
  })

  return (
    <group 
      ref={groupRef}
      scale={3}
      position={[-24, -6, 0]}
      rotation={[0, Math.PI * 0.3, 0]}
    >
      <primitive
        object={scene}
      />
    </group>
  )
}

export default Character
