import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("save-result", "routes/save-result.tsx"),
  route("history", "routes/history.tsx"),
] satisfies RouteConfig;
