import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

function _resolve(dir: string) {
   return path.resolve(__dirname, dir);
}
export default defineConfig({
   base: '/Whiteout-Survival-Help/',
   resolve: {
      alias: {
         '@': _resolve('src'),
         '#': _resolve('types'),
      },
   },
   plugins: [
      vue(),
      AutoImport({
         resolvers: [ElementPlusResolver()],
      }),
      Components({
         resolvers: [ElementPlusResolver()],
      }),
   ],
});
