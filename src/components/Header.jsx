import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="h-[2px] w-full bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)]" />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-4 sm:py-6 border-b border-[rgba(201,168,76,0.1)]">
        <div className="flex justify-center sm:justify-start">
          <img
            src={logo}
            alt="New SucessOdonto"
            className="block h-9 sm:h-20 object-contain"
          />
        </div>
      </div>
    </header>
  );
}

