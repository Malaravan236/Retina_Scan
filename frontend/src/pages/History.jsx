import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HistoryTable from '../components/HistoryTable.jsx'
import { getHistory, deleteScan } from '../api/api.js'

export default function History() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getHistory()
      setRecords(data.results ?? data)
    } catch (err) {
      setError('Could not load scan history. Is the Django backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id))
    try {
      await deleteScan(id)
    } catch {
      load()
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">
          Scan <span className="gradient-text">History</span>
        </h1>
        <p className="text-white/60">Every analyzed fundus image, saved and searchable.</p>
      </motion.div>

      {error && (
        <div className="mb-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-rose-200 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="glass rounded-3xl p-10 text-center text-white/50">Loading history…</div>
      ) : (
        <HistoryTable records={records} onDelete={handleDelete} />
      )}
    </div>
  )
}
