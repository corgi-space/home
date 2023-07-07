import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import microApp from "@micro-zoe/micro-app"
import App from "./App"
import "./styles/tailwind.css"
import "./styles/base.scss"

microApp.start({
	plugins: {
		modules: {
			// appName即应用的name值
			mall: [
				{
					loader(code) {
						if (process.env.NODE_ENV === "development") {
							// 这里 basename 需要和子应用vite.config.js中base的配置保持一致
							code = code.replace(/(from|import)(\s*['"])(\/mall\/)/g, all => {
								return all.replace("/mall/", "http://localhost:5173/mall/")
							})
						}

						return code
					}
				}
			]
		}
	}
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
