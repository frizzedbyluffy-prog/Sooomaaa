import { Link, NavLink } from "react-router";
import { useCart } from "@shopify/hydrogen-react";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b-2 border-white">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1600px] mx-auto">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col leading-none group">
          <span
            className="font-display text-2xl tracking-[0.15em] uppercase text-white group-hover:text-[#ff0000] transition-colors duration-75 glitch"
            data-text="ZYRAKO"
          >
            ZYRAKO
          </span>
          <span className="font-jp text-[10px] text-white/40 group-hover:text-[#ff0000]/60 transition-colors duration-75 tracking-widest">
            ゼイラコ
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {[
            { to: "/collections/all", label: "SHOP", jp: "ショップ" },
            { to: "/collections/new-arrivals", label: "NEW DROPS", jp: "新着" },
            { to: "/about", label: "ABOUT", jp: "について" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-body text-sm font-semibold uppercase tracking-widest border-b-2 pb-0.5 transition-colors duration-75 ${
                  isActive
                    ? "border-[#ff0000] text-[#ff0000]"
                    : "border-transparent text-white hover:border-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative font-body text-sm font-bold uppercase tracking-widest border-2 border-white px-4 py-2 hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-75"
        >
          カート
          {(totalQuantity ?? 0) > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#ff0000] text-white text-xs font-bold w-5 h-5 flex items-center justify-center border-2 border-[#0a0a0a] font-jp">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
