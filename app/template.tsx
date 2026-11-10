'use client'

import { motion } from 'framer-motion'

/**
 * Per-route entrance. Animates opacity only — never a transform — so it can
 * never create a containing block that would trap the fixed navbar or the
 * back-to-top control. Re-mounts on every navigation for a soft cross-fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
