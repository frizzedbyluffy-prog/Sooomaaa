import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@400;700;900&display=swap",
  },
];

const STORE_DOMAIN =
  (typeof process !== "undefined" && process.env?.PUBLIC_STORE_DOMAIN) ||
  "demo.myshopify.com";
const STOREFRONT_TOKEN =
  (typeof process !== "undefined" &&
    process.env?.PUBLIC_STOREFRONT_API_TOKEN) ||
  "";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-brand-black">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0a0a0a] text-white font-body">
        <ShopifyProvider
          storeDomain={STORE_DOMAIN}
          storefrontToken={STOREFRONT_TOKEN}
          storefrontApiVersion="2025-01"
          countryIsoCode="US"
          languageIsoCode="EN"
        >
          <CartProvider>{children}</CartProvider>
        </ShopifyProvider>
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "エラー";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="border-4 border-[#ff0000] p-12 max-w-lg w-full">
        <p className="font-jp text-[#ff0000] text-xs uppercase tracking-widest mb-4">
          システムエラー
        </p>
        <h1
          className="font-display text-8xl text-white uppercase mb-6 glitch"
          data-text={message}
        >
          {message}
        </h1>
        <p className="font-body text-sm text-white/60 uppercase tracking-wide">
          {details}
        </p>
      </div>
    </main>
  );
}
