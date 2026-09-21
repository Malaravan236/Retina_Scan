import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Scan' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass rounded-2xl shadow-card flex items-center justify-between px-5 py-3">
          <NavLink to="/" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'linear-gradient(135deg, #7f5af0, #ff6ec7)' }}
            >
              <FaEye className="text-white" />
            </motion.span>
            <span className="font-display text-lg font-bold tracking-tight">
              Retina<span className="gradient-text">Scan</span> AI
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium font-display transition ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden text-2xl text-white/80"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass rounded-2xl mt-2 overflow-hidden"
            >
              <div className="flex flex-col p-3 gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium font-display ${
                        isActive ? 'bg-white/15 text-white' : 'text-white/70'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
