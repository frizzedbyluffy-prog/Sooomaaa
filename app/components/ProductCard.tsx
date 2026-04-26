import { Link } from "react-router";

interface ProductImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}
interface MoneyValue { amount: string; currencyCode: string; }
interface Product {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage?: ProductImage | null;
  priceRange: { minVariantPrice: MoneyValue };
  compareAtPriceRange?: { minVariantPrice: MoneyValue };
}

function fmt(m: MoneyValue) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: m.currencyCode }).format(parseFloat(m.amount));
}

export function ProductCard({ product }: { product: Product }) {
  const { title, handle, featuredImage, priceRange, availableForSale, tags } = product;
  const isNew = tags.includes("new");
  const isLimited = tags.includes("limited");
  const price = priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link to={`/products/${handle}`} className="group block relative overflow-hidden bg-[#0a0a0a]">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={featuredImage.altText ?? title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <span className="font-jp text-white/10 text-6xl font-black">冬</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#ff0000]/0 group-hover:bg-[#ff0000]/10 transition-colors duration-300" />

        {/* Diagonal stripe reveal on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center justify-between bg-[#0a0a0a]/90 border-2 border-[#ff0000] px-4 py-3">
            <span className="font-display text-white text-sm uppercase tracking-widest">
              VIEW PIECE
            </span>
            <span className="font-jp text-[#ff0000] text-xs">→</span>
          </div>
        </div>

        {/* Badges */}
        {(isLimited || !availableForSale) && (
          <div className="absolute top-3 left-3 bg-[#ff0000] px-2 py-1 z-10">
            <span className="font-jp text-white text-[10px] font-bold tracking-wide">限定</span>
          </div>
        )}
        {isNew && availableForSale && (
          <div className="absolute top-3 left-3 border-2 border-[#ffff00] px-2 py-0.5 z-10">
            <span className="font-jp text-[#ffff00] text-[10px] font-bold">新着</span>
          </div>
        )}

        {/* Sold out */}
        {!availableForSale && (
          <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center z-20">
            <span className="font-display text-white text-2xl tracking-widest border-4 border-white px-4 py-2">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 border-t-2 border-white/10 group-hover:border-[#ff0000] transition-colors duration-200">
        <p className="font-display text-white text-base uppercase tracking-wide leading-tight mb-3 group-hover:text-[#ff0000] transition-colors duration-200 truncate">
          {title}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-body text-sm font-semibold text-white/70">{fmt(price)}</span>
          {hasDiscount && (
            <span className="font-body text-xs text-white/30 line-through">{fmt(compareAt)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
