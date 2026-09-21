import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import UploadCard from '../components/UploadCard.jsx'
import ResultCard from '../components/ResultCard.jsx'
import StatsCards from '../components/StatsCards.jsx'
import { predictScan, getStats } from '../api/api.js'
import { FaBolt, FaBrain, FaLock } from 'react-icons/fa'

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  const loadStats = async () => {
    try {
      const { data } = await getStats()
      setStats(data)
    } catch {
      /* backend may not be running yet — fail silently on the dashboard */
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  const handleAnalyze = async (file, patientName) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await predictScan(file, patientName)
      setResult(data)
      loadStats()
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong while analyzing the image.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wide text-white/70 mb-4">
          AI-Powered CNN Screening
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Detect <span className="gradient-text">Diabetic Retinopathy</span><br className="hidden sm:block" /> in seconds
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Upload a retina fundus photograph and get an instant AI-assisted screening result,
          complete with confidence scores and a saved scan history.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-white/50">
          <Badge icon={<FaBolt />} text="Instant results" />
          <Badge icon={<FaBrain />} text="CNN deep-learning model" />
          <Badge icon={<FaLock />} text="Local & private" />
        </div>
      </motion.section>

      <StatsCards stats={stats} />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-rose-200 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadCard onAnalyze={handleAnalyze} loading={loading} />
        <ResultCard result={result} />
      </div>
    </div>
  )
}

function Badge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
      <span className="text-aurora2">{icon}</span>
      {text}
    </span>
  )
}
