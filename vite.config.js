import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const hmisProxyBase = process.env.VITE_HMIS_PROXY_BASE || "";

function hmisBuildPlugin() {
  return {
    name: "hmis-build",
    closeBundle() {
      const distFile = path.resolve("dist/hmis-sso.html");
      if (!fs.existsSync(distFile)) return;
      const html = fs
        .readFileSync(distFile, "utf8")
        .replace(/__VITE_HMIS_PROXY_BASE__/g, hmisProxyBase);
      fs.writeFileSync(distFile, html);
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), hmisBuildPlugin()],
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
      "/hims-ui": {
        target: "http://15.252.193.15:8080",
        changeOrigin: true,
        bypass(req) {
          const pathname = req.url?.split("?")[0] || "";
          if (pathname === "/hims-ui/malaysia-hmis-sso.html") {
            return pathname;
          }
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
