/* eslint-disable no-console */
import react from '@vitejs/plugin-react';
import { defineConfig, HttpProxy, ProxyOptions } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { dependencies } from './package.json';

const proxyConfig = {
  target: process.env.PROXY_REQUEST_TO ? process.env.PROXY_REQUEST_TO : 'http://localhost:4200/',
  changeOrigin: true,
  secure: false,
  ws: false,
  configure: (proxy: HttpProxy.Server, _options: ProxyOptions) => {
    proxy.on('proxyReq', (proxyReq, req, _res) => {
      console.info('Sending Request: \n-o', req.method, req.url, '\n-proxy:', proxyReq.method, `${proxyReq.protocol}${proxyReq.host}${proxyReq.path}`);
    });
    proxy.on('proxyRes', (proxyRes, req, _res) => {
      console.info('Received Response from the Target:', proxyRes.statusCode, req.url);
    });
    proxy.on('error', (err, req, _res) => {
      console.info('proxy error', err, req.url);
    });
  }
};

const globalVendorPackages = ['react', 'react-dom'];
function renderChunks(deps: Record<string, string>) {
  const chunks: Record<number, string[]> = {};
  Object.keys(deps).forEach((key, index) => {
    if (globalVendorPackages.includes(key)) {
      return;
    }
    chunks[index] = [key];
  });
  return chunks;
}

export default defineConfig({
  root: '.',
  base: './',
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'es2015',
    outDir: './dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies)
        }
      }
    }
  },
  preview: {
    port: 8080
  },
  resolve: {
    preserveSymlinks: true
  },
  server: {
    port: 4200,
    strictPort: true,
    proxy: {
      '/api': proxyConfig
    }
  },
  plugins: [
    tsconfigPaths(),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.NODE_ENV === 'production' ? 'App' : `GestEPI`
        }
      }
    }),
    react({
      include: './src/**/*.{jsx,tsx}'
    })
  ]
});
