import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Icons from "unplugin-icons/vite"

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
		})
	]
})
