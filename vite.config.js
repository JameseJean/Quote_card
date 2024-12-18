import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest',
      buildStart() {
        if (!existsSync('dist')) {
          mkdirSync('dist', { recursive: true });
          console.log('✓ Created dist directory');
        }
        if (!existsSync('dist/icons')) {
          mkdirSync('dist/icons', { recursive: true });
          console.log('✓ Created dist/icons directory');
        }
      },
      writeBundle() {
        // 复制manifest.json和图标
        try {
          copyFileSync(
            resolve(__dirname, 'manifest.json'),
            resolve(__dirname, 'dist/manifest.json')
          );
          console.log('✓ manifest.json copied');
          
          // 复制 popup.html
          copyFileSync(
            resolve(__dirname, 'src/popup/popup.html'),
            resolve(__dirname, 'dist/popup.html')
          );
          console.log('✓ popup.html copied');

          // 复制 options.html
          copyFileSync(
            resolve(__dirname, 'src/options/options.html'),
            resolve(__dirname, 'dist/options.html')
          );
          console.log('✓ options.html copied');

          // 确保目标文件夹存在
          const iconsDir = resolve(__dirname, 'dist/icons');
          if (!existsSync(iconsDir)) {
            mkdirSync(iconsDir, { recursive: true });
            console.log('✓ Created dist/icons directory');
          }

          // 复制图标
          ['16', '48', '128'].forEach(size => {
            copyFileSync(
              resolve(__dirname, `icons/icon${size}.png`),
              resolve(__dirname, `dist/icons/icon${size}.png`)
            );
          });
          console.log('✓ icons copied');
        } catch (err) {
          console.error('Error copying files:', err);
          throw err;
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true, // 构建前清空目录
    rollupOptions: {
      input: {
        // popup: resolve(__dirname, 'src/popup/popup.html'),
        // options: resolve(__dirname, 'src/options/options.html'),
        background: resolve(__dirname, 'src/background/background.js'),
        // content: resolve(__dirname, 'src/content/content.js'),
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name === 'options') {
            return 'options.html';
          }
          if (['background', 'content'].includes(chunk.name)) {
            return '[name].js';
          }
          return 'assets/[name].[hash].js';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.html')) {
            return '[name][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  }
}); 