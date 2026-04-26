const DEFAULT_ITEMS = [
  "新着",
  "·",
  "NEW DROP",
  "·",
  "限定",
  "·",
  "WEAR THE CULTURE",
  "·",
  "ゼイラコ",
  "·",
  "NO RESTOCKS",
  "·",
  "アニメ",
  "·",
];

interface MarqueeProps {
  items?: string[];
  className?: string;
}

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: MarqueeProps) {
  const text = items.join("   ");
  return (
    <div
      className={`overflow-hidden bg-[#ff0000] border-y-4 border-[#0a0a0a] py-2 ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-display text-[#0a0a0a] text-sm tracking-[0.25em] uppercase pr-24 whitespace-nowrap"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
