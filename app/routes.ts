import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("collections/:handle", "routes/collections.$handle.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
