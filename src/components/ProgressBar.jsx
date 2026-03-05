import { motion } from 'framer-motion';

export function ProgressBar({ current, total }) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1 text-[13px] text-[#888888]">
          <span>⚡</span>
          <span>
            Pergunta {current} de {total}
          </span>
        </span>
        <span className="text-[13px] text-gold-soft">
          {current} / {total}
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[#151515] border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(201,168,76,0.4)_0,transparent_55%)] opacity-40" />
        <motion.div
          className="relative h-full bg-gradient-to-r from-gold to-gold-soft shadow-[0_0_22px_rgba(201,168,76,0.65)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

