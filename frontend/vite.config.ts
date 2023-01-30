import path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const sharedSrc = path.resolve(__dirname, '..', 'shared');
console.log(sharedSrc);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#constants': path.join(sharedSrc, 'constants', 'index.ts'),
      '#entities': path.join(sharedSrc, 'entities', 'index.ts'),
      '#interfaces': path.join(sharedSrc, 'interfaces', 'index.ts'),
      '#utils': path.join(sharedSrc, 'utils', 'index.ts'),
    },
  },

});
