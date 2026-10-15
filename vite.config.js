import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      "/TATA_postgres": {
        target: "http://15.252.193.15:8080",
        changeOrigin: true,
        configure(proxy) {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader("origin");
            proxyReq.removeHeader("referer");
          });
        },
      },
      "/setu-auth": {
        target: "https://setuai.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/setu-auth/, "/auth"),
      },
    },
  },
});
