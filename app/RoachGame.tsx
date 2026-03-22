"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function RoachGame() {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [isAlive, setIsAlive] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [size, setSize] = useState(200)

  const moveRoach = () => {
    if (!isAlive) return
    const randomTop = Math.floor(Math.random() * 80)
    const randomLeft = Math.floor(Math.random() * 80)
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
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsAlive(false)
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
        transitionDuration: isAlive ? `${Math.random() * 3000 + 2000}ms` : '0ms',
      }}
    >

      <div >
        {isAlive ?
          <Image
            src="/roach.png"
            alt="Roach"
            width={size}
            height={size}
          />
          : <Image
            src="/roachDead2.png"
            alt="Roach"
            width={size}
            height={size} />
        }
      </div>
    </div>
  )
}
