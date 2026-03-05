import { motion } from 'framer-motion';

export function MidwayStep() {
  return (
    <motion.div
      className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.75rem] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-center overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute -inset-20 opacity-[0.07] bg-[radial-gradient(circle_at_10%_0%,#C9A84C_0,transparent_45%),radial-gradient(circle_at_90%_0%,#E8C96D_0,transparent_45%)]" />
      <div className="relative">
        <h3 className="text-2xl font-semibold mb-3">🔎 Analisando seus padrões iniciais…</h3>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-textSecondary mb-2">
          Com base nas suas respostas até aqui, já é possível identificar pontos críticos estratégicos.
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-textSecondary">
          Faltam apenas 6 perguntas para liberar seu diagnóstico completo.
        </p>
      </div>
    </motion.div>
  );
}

