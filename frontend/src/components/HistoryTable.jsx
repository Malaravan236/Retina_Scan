import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

export default function HistoryTable({ records, onDelete }) {
  if (!records?.length) {
    return (
      <div className="glass rounded-3xl p-10 text-center text-white/50">
        No scans yet. Analyze an image on the Scan page to build up history.
      </div>
    )
  }

  return (
    <div className="glass rounded-3xl p-4 sm:p-6 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10">
              <th className="py-3 px-3">Scan</th>
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3">Result</th>
              <th className="py-3 px-3">Confidence</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {records.map((r) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-3">
                    <img src={r.image_url} alt="scan" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  </td>
                  <td className="py-3 px-3">{r.patient_name || 'Anonymous'}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        r.predicted_class === 'DR'
                          ? 'bg-rose-500/15 text-rose-300'
                          : 'bg-emerald-500/15 text-emerald-300'
                      }`}
                    >
                      {r.predicted_class === 'DR' ? <FaExclamationTriangle /> : <FaCheckCircle />}
                      {r.predicted_class}
                    </span>
                  </td>
                  <td className="py-3 px-3">{(r.confidence * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-white/50">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onDelete(r.id)}
                      className="text-white/40 hover:text-rose-400 transition p-2"
                      aria-label="Delete record"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
