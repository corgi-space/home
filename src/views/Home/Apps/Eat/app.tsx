import { Input } from "antd"
import { createAppModal } from "../../hooks/CreateAppModal"
import useEat from "./useEat"

const EatApp = createAppModal(() => {
	const [run, content, foods, setFoods] = useEat()

	return (
		<div>
			<h3>{content}</h3>
			<button onClick={run}>开始</button>

			<Input.TextArea value={foods}></Input.TextArea>
		</div>
	)
})

export default EatApp
