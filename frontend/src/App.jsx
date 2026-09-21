import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackgroundBlobs from './components/BackgroundBlobs.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
