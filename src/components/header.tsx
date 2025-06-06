export default function Header() {
  return (
    <div>
      <header className="text-3xl font-extrabold container mx-auto mb-20">
        <Logo />
      </header>
    </div>
  );
}

export function Logo() {
  return (
    <div>
      FocusFlux
      <span className="h-2 w-2 rounded-full bg-[#4285F4] inline-block ml-1"></span>
    </div>
  );
}
