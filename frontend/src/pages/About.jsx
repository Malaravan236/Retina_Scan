import React from 'react'
import { motion } from 'framer-motion'
import { FaBrain, FaUpload, FaSearch, FaHistory } from 'react-icons/fa'

export default function About() {
  return (
    <div>
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="font-display text-3xl font-bold mb-3">
          About <span className="gradient-text">RetinaScan AI</span>
        </h1>

        <p className="text-white/60 max-w-2xl mx-auto">
          RetinaScan AI is an AI-powered retinal screening application designed
          to analyze retinal fundus images and classify them as
          <b> Diabetic Retinopathy (DR)</b> or <b>No Diabetic Retinopathy (No DR)</b>.
        </p>
      </motion.div>

      {/* How It Works */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass rounded-2xl p-5 flex items-start gap-4 shadow-card"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7f5af0, #2cb1bc)',
            }}
          >
            <FaUpload />
          </div>

          <div>
            <p className="font-display font-semibold">Upload Image</p>
            <p className="text-sm text-white/60">
              Upload a retinal fundus image for screening.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="glass rounded-2xl p-5 flex items-start gap-4 shadow-card"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7f5af0, #2cb1bc)',
            }}
          >
            <FaBrain />
          </div>

          <div>
            <p className="font-display font-semibold">AI Analysis</p>
            <p className="text-sm text-white/60">
              The uploaded image is analyzed using an AI-based screening model.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="glass rounded-2xl p-5 flex items-start gap-4 shadow-card"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7f5af0, #2cb1bc)',
            }}
          >
            <FaSearch />
          </div>

          <div>
            <p className="font-display font-semibold">View Result</p>
            <p className="text-sm text-white/60">
              The image is classified as DR or No DR with prediction probabilities.
            </p>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="glass rounded-2xl p-5 flex items-start gap-4 shadow-card"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7f5af0, #2cb1bc)',
            }}
          >
            <FaHistory />
          </div>

          <div>
            <p className="font-display font-semibold">Scan History</p>
            <p className="text-sm text-white/60">
              Previous scan results can be reviewed through the history section.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6 flex items-center gap-4"
      >
        <FaBrain className="text-3xl text-aurora2 shrink-0" />

        <p className="text-sm text-white/70">
          RetinaScan AI is developed for educational and research purposes.
          The results are intended to support screening and should not be
          considered a substitute for professional medical diagnosis or treatment.
          Please consult a qualified ophthalmologist for medical advice.
        </p>
      </motion.div>
    </div>
  )
}