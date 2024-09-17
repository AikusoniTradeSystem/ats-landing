import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
    let apiPath = "http://localhost:3000/remoteEntry.js";
    let devPort = 3000;
    switch (mode) {
        case "development":
            apiPath = "http://localhost:18080/api";
            devPort = 28080;
            break;
        case "production":
            apiPath = "/api";
            break
    }

    return {
        server: {
            port: devPort,
            proxy: {
                '/api': {
                    target: apiPath,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        plugins: [
            react()
        ],
        build: {
            outDir: '/app/dist'
        }
    };
});
