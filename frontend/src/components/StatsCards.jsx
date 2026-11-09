import React from 'react'
import { motion } from 'framer-motion'
import { FaFileMedicalAlt, FaExclamationCircle, FaShieldAlt, FaPercentage } from 'react-icons/fa'

const cards = (stats) => [
  { label: 'Total Scans', value: stats.total_scans, icon: <FaFileMedicalAlt />, color: 'from-aurora1 to-aurora3' },
  { label: 'DR Detected', value: stats.dr_count, icon: <FaExclamationCircle />, color: 'from-aurora2 to-rose-500' },
  { label: 'No DR', value: stats.no_dr_count, icon: <FaShieldAlt />, color: 'from-emerald-400 to-aurora3' },
  { label: 'Avg. Confidence', value: `${stats.average_confidence}%`, icon: <FaPercentage />, color: 'from-aurora4 to-aurora2' },
]

export default function StatsCards({ stats }) {
  if (!stats) return null
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards(stats).map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="glass rounded-2xl p-4 sm:p-5 shadow-card"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 bg-gradient-to-br ${c.color}`}
          >
            {c.icon}
          </div>
          <p className="text-2xl font-display font-bold">{c.value}</p>
          <p className="text-xs text-white/50 mt-1">{c.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
