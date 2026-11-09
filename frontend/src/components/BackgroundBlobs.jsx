import React from 'react'

export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-aurora1/40 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-aurora2/40 rounded-full mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aurora3/40 rounded-full mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0e2c_85%)]" />
    </div>
  )
}
