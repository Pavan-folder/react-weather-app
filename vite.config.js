import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-weather-app/',  // repo name
  plugins: [react()],
});
