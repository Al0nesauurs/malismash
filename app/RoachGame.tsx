"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const tiltAnimation = `
  @keyframes tilt {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
`

export default function RoachGame({ isMuted }: { isMuted: boolean }) {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [isAlive, setIsAlive] = useState(true)
  const [transitionDuration, setTransitionDuration] = useState(5000)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [size, setSize] = useState(200)

  const startVibe = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Force restart from beginning
      audioRef.current.play()
    }
    setHasStarted(true)
  }

  const handleAudioEnd = () => {
    setHasStarted(false) // Bring back the "Enter" screen when song finishes
  }

  const moveRoach = () => {
    if (!isAlive) return
    const randomTop = Math.floor(Math.random() * 80)
    const randomLeft = Math.floor(Math.random() * 80)
    const duration = Math.random() * 3000 + 2000
    setTransitionDuration(duration)
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` })
  }

  const respawnRoach = () => {
    moveRoach()
    setSize(Math.floor(Math.random() * 151) + 200)
    setIsAlive(true)
    intervalRef.current = setInterval(moveRoach, Math.random() * 3000 + 2000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    respawnRoach()
  }, [])

  const handleSmash = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAlive) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsAlive(false)
    startVibe()
    setTimeout(() => {
      respawnRoach()
    }, 5000)
  }

  return (
    <div
      onClick={handleSmash}
      className={`absolute ${isAlive ? 'transition-all ease-in-out' : 'transition-none'} cursor-pointer text-5xl select-none`}
      style={{
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        transitionDuration: isAlive ? `${transitionDuration}ms` : '0ms',
      }}
    >

      <style>{tiltAnimation}</style>
      <audio
        ref={audioRef}
        src="/pop.mp3"
        onEnded={handleAudioEnd}
        muted={isMuted}
      />
  
      <div style={isAlive ? { animation: 'tilt 0.3s infinite' } : { animation: 'none' }}>
        {isAlive ?
          <Image
            src="/roach.png"
            alt="Roach"
            width={size}
            height={size}
            style={{ width: size, height: size }}
            loading="eager"
          />
          : <Image
            src="/roachDead2.png"
            alt="Roach"
            width={size}
            height={size}
            style={{ width: size, height: size }}
            loading="eager"
          />
        }
      </div>
    </div>
  )
}
