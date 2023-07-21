import { Input } from "antd"
import { createAppModal } from "../../hooks/CreateAppModal"
import useEat from "./useEat"
import BgPath from "./assets/bg.svg"

const EatApp = createAppModal(() => {
	const [run, content, foods, setFoods] = useEat()

	return (
		<div
			style={{
				backgroundImage: `url(${BgPath})`,
				backgroundSize: "cover"
			}}
		>
			<h3>{content}</h3>
			<button onClick={run}>开始</button>

			<Input.TextArea value={foods}></Input.TextArea>
		</div>
	)
})

export default EatApp
