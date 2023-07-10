import { ReactNode } from "react"
import TimeBox from "../../components/TimeBox"

function index(props: { children: ReactNode }) {
	return (
		<div>
			马里奥主题
			<TimeBox />
			<div>{props.children}</div>
		</div>
	)
}

export default index
