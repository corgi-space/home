import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import microApp from "@micro-zoe/micro-app"
import App from "./App"
import "./styles/tailwind.css"
import "./styles/base.css"

microApp.start()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
