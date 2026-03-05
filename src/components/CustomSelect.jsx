import { useEffect, useRef, useState } from 'react';

export function CustomSelect({ label, placeholder, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options?.find((opt) => opt.value === value) || null;

  const handleOptionClick = (option) => {
    if (!onChange) return;
    if (option.value === value) {
      setIsOpen(false);
      return;
    }
    onChange(option.value);
    setIsOpen(false);
  };

  const getBadgeStyles = (badgeColor) => {
    switch (badgeColor) {
      case 'red':
        return {
          background: 'rgba(217,83,79,0.15)',
          color: '#d9534f',
          border: '1px solid rgba(217,83,79,0.3)'
        };
      case 'yellow':
        return {
          background: 'rgba(240,173,78,0.15)',
          color: '#f0ad4e',
          border: '1px solid rgba(240,173,78,0.3)'
        };
      case 'green':
        return {
          background: 'rgba(92,184,92,0.15)',
          color: '#5cb85c',
          border: '1px solid rgba(92,184,92,0.3)'
        };
      case 'gold':
        return {
          background: 'rgba(201,168,76,0.15)',
          color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.3)'
        };
      default:
        return {
          background: 'rgba(255,255,255,0.06)',
          color: '#C8C8C8',
          border: '1px solid rgba(255,255,255,0.06)'
        };
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-textMain">{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-[18px] py-[14px] rounded-[14px] bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.2)] text-white text-left flex items-center justify-between gap-3 cursor-pointer transition-colors transition-shadow duration-200 ${
          isOpen ? 'border-[rgba(201,168,76,0.55)] bg-[rgba(201,168,76,0.06)]' : ''
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          boxShadow: isOpen ? '0 0 0 3px rgba(201,168,76,0.08)' : 'none'
        }}
      >
        {selectedOption ? (
          <span className="flex items-center gap-2 text-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-[#C9A84C] flex-shrink-0" />
            {selectedOption.emoji && (
              <span className="text-lg leading-none">{selectedOption.emoji}</span>
            )}
            <span>{selectedOption.label}</span>
          </span>
        ) : (
          <span className="text-sm text-[#555]">{placeholder}</span>
        )}

        <svg
          className={`w-[18px] h-[18px] text-[#C9A84C] transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`absolute left-0 right-0 mt-2 origin-top rounded-[16px] border border-[rgba(201,168,76,0.25)] bg-[rgba(18,18,18,0.95)] overflow-hidden z-50 transform transition-[opacity,transform] duration-200 ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
        }`}
        style={{
          backdropFilter: 'blur(24px)',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
        }}
      >
        <div className="px-4 pt-3 pb-2 text-[10px] font-medium tracking-[0.18em] text-[#444] uppercase border-b border-white/5">
          Selecione uma opção
        </div>

        <div className="max-h-64 overflow-y-auto">
          {options?.map((option) => {
            const isSelected = selectedOption && selectedOption.value === option.value;
            const badgeStyles = option.badge ? getBadgeStyles(option.badgeColor) : null;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`w-full px-[18px] py-[13px] text-[15px] flex items-center gap-3 text-left text-[#C8C8C8] transition-colors relative ${
                  isSelected
                    ? 'bg-[rgba(201,168,76,0.10)] text-[#E8C96D]'
                    : 'hover:bg-[rgba(201,168,76,0.08)] hover:text-white'
                }`}
              >
                <span
                  className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${
                    isSelected ? 'bg-[#C9A84C]' : 'bg-[#333]'
                  }`}
                />

                {option.emoji && (
                  <span className="text-lg leading-none flex-shrink-0">{option.emoji}</span>
                )}

                <span className="flex-1 text-sm">{option.label}</span>

                {option.badge && (
                  <span
                    className="ml-2 text-[10px] px-2 py-[2px] rounded-full font-medium flex-shrink-0"
                    style={badgeStyles}
                  >
                    {option.badge}
                  </span>
                )}

                <svg
                  className={`ml-2 w-4 h-4 stroke-[#C9A84C] transition-opacity duration-150 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

