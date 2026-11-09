import React from 'react'
import { FaHeartbeat } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="glass rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p className="flex items-center gap-2">
            <FaHeartbeat className="text-aurora2" />
            RetinaScan AI &mdash; CNN-based Diabetic Retinopathy screening assistant.
          </p>
          {/* <p>
            Built with <span className="text-white/80">Django</span> + <span className="text-white/80">React</span>.
            Not a substitute for professional medical diagnosis.
          </p> */}
        </div>
      </div>
    </footer>
  )
}
