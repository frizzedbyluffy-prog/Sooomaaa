import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t-4 border-[#ff0000] mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Brand block */}
          <div className="md:border-r-2 border-white pr-0 md:pr-8 pb-8 md:pb-0">
            <p className="font-display text-5xl text-[#ff0000] uppercase leading-none">
              ZYRAKO
            </p>
            <p className="font-jp text-2xl text-white/20 mt-1">ゼイラコ</p>
            <p className="font-body text-xs uppercase tracking-widest text-white/40 mt-3">
              ANIME. STREET. CULTURE.
            </p>
          </div>

          {/* Nav links */}
          <div className="pl-0 md:pl-8 pt-8 md:pt-0 border-t-2 md:border-t-0 border-white/20">
            <p className="font-jp text-xs font-bold text-[#ff0000] mb-4 tracking-widest">
              ナビゲーション
            </p>
            {[
              { to: "/collections/all", label: "SHOP ALL" },
              { to: "/collections/new-arrivals", label: "NEW DROPS" },
              { to: "/about", label: "ABOUT" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block font-body text-sm uppercase text-white hover:text-[#ff0000] mb-2 tracking-wide transition-colors duration-75"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="pl-0 md:pl-8 pt-8 md:pt-0 border-t-2 md:border-t-0 border-white/20">
            <p className="font-jp text-xs font-bold text-[#ff0000] mb-4 tracking-widest">
              法律
            </p>
            {[
              { to: "/policies/privacy-policy", label: "PRIVACY POLICY" },
              { to: "/policies/terms-of-service", label: "TERMS" },
              { to: "/policies/refund-policy", label: "RETURNS" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block font-body text-sm uppercase text-white/50 hover:text-[#ff0000] mb-2 tracking-wide transition-colors duration-75"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-white/20 mt-12 pt-4 flex items-center justify-between">
          <p className="font-body text-xs text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} ZYRAKO. ALL RIGHTS RESERVED.
          </p>
          <p className="font-jp text-xs text-white/20">文化を着る</p>
        </div>
      </div>
    </footer>
  );
}
