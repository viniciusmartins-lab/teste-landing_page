const getColorClass = (value) => {
  if (value >= 1 && value <= 6) return 'bg-nps-detrator';
  if (value >= 7 && value <= 8) return 'bg-nps-neutro';
  return 'bg-nps-promotor';
};

export function NPSButtons({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-3 sm:flex sm:flex-wrap sm:justify-between mt-6">
      {Array.from({ length: 10 }, (_, i) => {
        const value = i + 1;
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`w-full sm:w-16 h-12 sm:h-14 rounded-xl border border-white/10 text-white font-semibold text-lg transition-transform transition-shadow duration-150
              ${getColorClass(value)}
              ${isSelected ? 'ring-2 ring-gold-soft scale-110 shadow-[0_0_30px_rgba(201,168,76,0.55)]' : 'hover:scale-105 hover:shadow-[0_0_22px_rgba(201,168,76,0.45)]'}
            `}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}

