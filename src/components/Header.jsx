import logo from '../assets/logo.png';

export default function Header({ theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="bg-transparent">
      <div className="h-[2px] w-full bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)]" />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-4 sm:py-6 border-b border-[rgba(201,168,76,0.1)] flex items-center justify-between gap-4">
        <div className="flex justify-start flex-1">
          <img
            src={logo}
            alt="New SucessOdonto"
            className="block h-9 sm:h-20 object-contain"
          />
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 text-xs font-medium text-textSecondary hover:bg-black/70 transition-colors"
        >
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C9A84C]/10">
            {isDark ? '🌙' : '☀️'}
          </span>
          <span>{isDark ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  );
}

