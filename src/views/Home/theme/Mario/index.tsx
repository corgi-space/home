import { ReactNode, useEffect } from "react"
import { CreateTheme } from "./render"

function index(props: { children: ReactNode }) {
	useEffect(() => {
		const themeApp = new CreateTheme("#theme-bg")
		return () => {
			themeApp.destroyed()
		}
	}, [])

	return (
		<div className="relative">
			<div id="theme-bg"></div>
			<div className="absolute left-0 top-0">{props.children}</div>
		</div>
	)
}

export default index
