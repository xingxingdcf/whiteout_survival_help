import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

function _resolve(dir: string) {
   return path.resolve(__dirname, dir);
}
export default defineConfig({
   base: '/whiteout_survival_help/',
   resolve: {
      alias: {
         '@': _resolve('src'),
         '#': _resolve('types'),
      },
   },
   plugins: [
      vue(),
      vueJsx(),

      AutoImport({
         imports: [
            'vue',
            {
               'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
            },
         ],
      }),
      Components({
         resolvers: [NaiveUiResolver()],
      }),
   ],
   css: {
      postcss: {
         plugins: [tailwindcss, autoprefixer],
      },
   },
});
