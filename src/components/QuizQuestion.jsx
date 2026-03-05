import { NPSButtons } from './NPSButtons';

export function QuizQuestion({ index, total, question, selectedValue, onSelect }) {
  return (
    <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.75rem] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -inset-20 opacity-[0.06] bg-[radial-gradient(circle_at_0%_0%,#C9A84C_0,transparent_45%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_45%)]" />
      <div className="relative">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-soft mb-2">
        Pergunta {index} de {total}
      </p>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2">{question.category}</h3>
      <p className="text-sm sm:text-base text-textSecondary leading-relaxed">{question.text}</p>
      <NPSButtons selected={selectedValue} onSelect={onSelect} />
      </div>
    </div>
  );
}

