import { useCart } from "@shopify/hydrogen-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { lines, cost, checkoutUrl, linesRemove, linesUpdate, totalQuantity } =
    useCart();
  const cartLines = (lines ?? []) as any[];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-[#0a0a0a]/85 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l-4 border-[#ff0000] z-50 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-white">
          <div>
            <span className="font-display text-xl uppercase text-white tracking-widest">
              カート
            </span>
            <span className="font-body text-xs text-white/50 uppercase tracking-widest ml-3">
              ({totalQuantity ?? 0} ITEMS)
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-body text-white hover:text-[#ff0000] text-2xl leading-none border-2 border-white hover:border-[#ff0000] w-10 h-10 flex items-center justify-center transition-colors duration-75"
          >
            ×
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartLines.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-jp text-4xl text-white/20 font-black">空</p>
              <p className="font-display text-2xl text-white/20 uppercase mt-2">
                EMPTY
              </p>
              <p className="font-body text-xs text-white/30 mt-3 uppercase tracking-widest">
                Add something raw
              </p>
            </div>
          ) : (
            cartLines.map((line: any) => {
              const merchandise = line.merchandise;
              if (merchandise?.__typename !== "ProductVariant") return null;
              const img = merchandise.product?.featuredImage;
              return (
                <div
                  key={line.id}
                  className="flex gap-4 border-b-2 border-white/20 pb-6"
                >
                  {/* Image */}
                  <div className="w-20 h-24 flex-shrink-0 border-2 border-white overflow-hidden">
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText ?? ""}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm uppercase text-white tracking-wide leading-tight truncate">
                      {merchandise.product?.title}
                    </p>
                    <p className="font-body text-xs text-white/50 uppercase mt-0.5">
                      {merchandise.selectedOptions
                        ?.map((o: any) => o?.value)
                        .join(" / ")}
                    </p>
                    {merchandise.price && (
                      <p className="font-body text-sm font-semibold text-[#ff0000] mt-1">
                        {formatMoney(
                          merchandise.price.amount,
                          merchandise.price.currencyCode
                        )}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          line.quantity > 1
                            ? linesUpdate([
                                { id: line.id, quantity: line.quantity - 1 },
                              ])
                            : linesRemove([line.id])
                        }
                        className="w-7 h-7 border-2 border-white text-white hover:border-[#ff0000] hover:text-[#ff0000] flex items-center justify-center font-bold text-lg leading-none transition-colors duration-75"
                      >
                        −
                      </button>
                      <span className="font-body text-sm text-white w-5 text-center">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          linesUpdate([
                            { id: line.id, quantity: line.quantity + 1 },
                          ])
                        }
                        className="w-7 h-7 border-2 border-white text-white hover:border-[#ff0000] hover:text-[#ff0000] flex items-center justify-center font-bold text-lg leading-none transition-colors duration-75"
                      >
                        +
                      </button>
                      <button
                        onClick={() => linesRemove([line.id])}
                        className="ml-auto font-body text-xs uppercase text-white/40 hover:text-[#ff0000] tracking-widest transition-colors duration-75"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartLines.length > 0 && (
          <div className="p-6 border-t-2 border-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-sm uppercase tracking-widest text-white/70">
                SUBTOTAL
              </span>
              {cost?.subtotalAmount?.amount && (
                <span className="font-display text-xl text-white">
                  {formatMoney(
                    cost.subtotalAmount.amount,
                    cost.subtotalAmount.currencyCode ?? "USD"
                  )}
                </span>
              )}
            </div>
            <a
              href={checkoutUrl ?? "#"}
              className="block w-full bg-[#ff0000] text-white font-display text-lg uppercase tracking-widest text-center py-4 border-4 border-[#ff0000] hover:bg-[#0a0a0a] hover:text-[#ff0000] transition-colors duration-75"
            >
              チェックアウト →
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
