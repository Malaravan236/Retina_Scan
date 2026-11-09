import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUploadCloud, FiImage, FiX } from 'react-icons/fi'
import { FaMagic } from 'react-icons/fa'

export default function UploadCard({ onAnalyze, loading }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [patientName, setPatientName] = useState('')

  const onDrop = useCallback((accepted) => {
    if (!accepted?.length) return
    const f = accepted[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    multiple: false,
  })

  const clear = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6 sm:p-8 shadow-card"
    >
      <h2 className="font-display text-xl font-bold mb-1 flex items-center gap-2">
        <FaMagic className="text-aurora2" /> Upload a retina fundus scan
      </h2>
      <p className="text-white/60 text-sm mb-6">
        Drop a fundus photograph and let the CNN model screen it for diabetic retinopathy in seconds.
      </p>

      <input
        type="text"
        placeholder="Patient name (optional)"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/15 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-aurora1 transition"
      />

      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            {...getRootProps()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              isDragActive ? 'border-aurora2 bg-white/10' : 'border-white/25 hover:border-aurora1 hover:bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ background: 'linear-gradient(135deg, #7f5af0, #ff6ec7)' }}
            >
              <FiUploadCloud />
            </motion.div>
            <p className="font-display font-semibold">
              {isDragActive ? 'Drop the image here…' : 'Drag & drop a fundus image, or click to browse'}
            </p>
            <p className="text-white/40 text-sm mt-1">JPG, PNG or WEBP</p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl overflow-hidden border border-white/15"
          >
            <img src={preview} alt="Selected fundus scan" className="w-full h-72 object-cover" />
            <button
              onClick={clear}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition"
              aria-label="Remove image"
            >
              <FiX />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center gap-2 text-sm">
              <FiImage className="text-aurora2" />
              <span className="truncate">{file?.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        disabled={!file || loading}
        onClick={() => onAnalyze(file, patientName)}
        className="btn-primary w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Analyzing scan…
          </>
        ) : (
          <>
            <FaMagic /> Analyze Scan
          </>
        )}
      </button>
    </motion.div>
  )
}
