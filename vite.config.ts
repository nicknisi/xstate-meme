import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    plugins: [react()],
    publicDir: './public/',
  };
});
