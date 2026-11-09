import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

const COLORS = ['#ff6ec7', '#2cb1bc']

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-8 shadow-card h-full flex flex-col items-center justify-center text-center text-white/40 min-h-[420px]"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-3xl mb-4 animate-float">
          👁️
        </div>
        <p className="font-display font-semibold text-white/60">Your results will appear here</p>
        <p className="text-sm mt-1">Upload a fundus image and click Analyze.</p>
      </motion.div>
    )
  }

  const isDR = result.predicted_class === 'DR'
  const data = [
    { name: 'DR', value: result.dr_probability },
    { name: 'No DR', value: result.no_dr_probability },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6 sm:p-8 shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold">Diagnosis Result</h2>
        <span className="text-xs text-white/40">{new Date(result.created_at).toLocaleString()}</span>
      </div>

      <div
        className={`rounded-2xl p-5 mb-6 flex items-center gap-4 border ${
          isDR ? 'bg-rose-500/10 border-rose-400/30' : 'bg-emerald-500/10 border-emerald-400/30'
        }`}
      >
        <div className={`text-3xl ${isDR ? 'text-rose-400' : 'text-emerald-400'}`}>
          {isDR ? <FaExclamationTriangle /> : <FaCheckCircle />}
        </div>
        <div>
          <p className="font-display text-lg font-bold">
            {isDR ? 'Diabetic Retinopathy Signs Detected' : 'No Diabetic Retinopathy Detected'}
          </p>
          <p className="text-sm text-white/60">
            Confidence: <span className="font-semibold text-white">{(result.confidence * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => `${(v * 100).toFixed(1)}%`}
                contentStyle={{ background: '#151833', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <ConfidenceBar label="DR" value={result.dr_probability} color="#ff6ec7" />
          <ConfidenceBar label="No DR" value={result.no_dr_probability} color="#2cb1bc" />
        </div>
      </div>

      {result.image_url && (
        <img
          src={result.image_url}
          alt="Analyzed fundus scan"
          className="w-full h-40 object-cover rounded-xl mt-6 border border-white/10"
        />
      )}
    </motion.div>
  )
}

function ConfidenceBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-white/60">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
