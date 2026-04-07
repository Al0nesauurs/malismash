'use client'

import React from 'react'
import RoachGame from './RoachGame'

export default function RoachGameContainer() {
  const [count, setCount] = React.useState(5)
  const [isMuted, setIsMuted] = React.useState(false)

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <audio
        autoPlay
        loop
        src="/bgm.mp3"
        muted={isMuted}
        controls={false}
        style={{ display: 'none' }}
      />
      {Array.from({ length: count }).map((_, index) => (
        <RoachGame key={index} isMuted={isMuted} />
      ))}

      <div style={{
        position: 'absolute',
        right: 10,
        bottom: 10
      }}>
        <div onClick={() => setCount(Math.min(10, count + 1))}>+</div>
        <div onClick={() => setCount(Math.max(1, count - 1))}>-</div>
        <div onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? 'Unmute' : 'Mute'}
        </div>
      </div>
    </div>
  )
}