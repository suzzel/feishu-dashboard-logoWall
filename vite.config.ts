import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path"
import vue from "@vitejs/plugin-vue"
import { semiTheming } from "./plugins/semi-theming"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
		vue(),
        semiTheming({
            theme: "@semi-bot/semi-theme-feishu-dashboard"
        }),
		// semiTheming({
		// 	theme: "@semi-bot/semi-theme-feishu-dashboard"
		// })
    ],
    base: "./",
	resolve: {
		alias: {
		  "@": path.resolve(__dirname, "./src"),
		},
	  },
})
