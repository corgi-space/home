import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Icons from "unplugin-icons/vite"
import { visualizer } from "rollup-plugin-visualizer"
import legacy from "@vitejs/plugin-legacy"
import viteCompression from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		port: 8080
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
	plugins: [
		react(),
		Icons({
			autoInstall: true,
			compiler: "jsx",
			jsx: "react"
		}),
		visualizer({
			emitFile: false,
			open: true //如果存在本地服务端口，将在打包后自动展示
		}),
		legacy(),
		viteCompression({
			verbose: true,
			disable: false, // 不禁⽤压缩
			deleteOriginFile: false, // 压缩后是否删除原⽂件
			threshold: 10240, // 压缩前最⼩⽂件⼤⼩
			algorithm: "gzip", // 压缩算法
			ext: ".gz" // ⽂件类型
		})
	],
	build: {
		terserOptions: {
			output: {
				comments: true
			}
		}
	}
})
