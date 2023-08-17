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
		<div className="full relative">
			<div id="theme-bg" className="full fixed left-0 top-0 z-[1]"></div>
			<div className="container absolute left-0 right-0 top-[210px] z-10 mx-auto box-border h-[calc(100%-210px)] pb-4">
				{props.children}
			</div>
		</div>
	)
}

export default index
