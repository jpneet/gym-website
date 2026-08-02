import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as fs from 'node:fs';
import * as path from 'node:path';

// Resolve the frames directory (one level up from forge-react)
const framesDir = path.resolve(import.meta.dirname, '../vanilla-backup/public/frames');

const devFramesMiddleware = () => ({
  name: 'dev-frames',
  configureServer(server: any) {
    server.middlewares.use('/frames/', (req: any, res: any, next: any) => {
      const file = path.join(framesDir, req.url!);
      if (fs.existsSync(file)) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        fs.createReadStream(file).pipe(res);
      } else {
        next();
      }
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devFramesMiddleware(),
    viteStaticCopy({
      targets: [{ src: '../vanilla-backup/public/frames', dest: '.' }],
    }),
  ],
  server: {
    fs: { allow: ['..'] },
  },
});
