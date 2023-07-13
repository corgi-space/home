import { ReactNode, useEffect, useState } from "react"
// import TimeBox from "./timeBox"
import { CreateTheme } from "./render"
import { useTimeMatrix } from "../../hooks/useTimeArr"

function index(props: { children: ReactNode }) {
	const [timeMatrix, timeArr] = useTimeMatrix()
	const [app, setApp] = useState<CreateTheme>()

	useEffect(() => {
		setApp(new CreateTheme("#theme-bg"))
	}, [])

	useEffect(() => {
		if (app && timeMatrix) {
			app.renderTime(timeMatrix, timeArr)
		}
	}, [timeMatrix])

	return (
		<div className="relative">
			<div id="theme-bg"></div>
			<div className="absolute left-0 top-0">{props.children}</div>
		</div>
	)
}

export default index
