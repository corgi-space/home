import { Button, Input } from "antd"
import { createAppModal } from "../../hooks/CreateAppModal"
import useEat from "./useEat"
import BgPath from "./assets/bg.svg"

export const App = () => {
	const { run, runing, content, foods, changeContent } = useEat()

	return (
		<div
			style={{
				backgroundImage: `url(${BgPath})`,
				backgroundSize: "contain"
			}}
			className="flex h-full flex-col items-center justify-evenly text-center"
		>
			<h3 className="my-10 text-lg">{content}</h3>
			<Button
				type={runing ? "default" : "primary"}
				onClick={run}
				className="mt-3 w-40 !rounded-full"
			>
				{runing ? "停止" : "开始"}
			</Button>

			<div className="mx-auto my-10 w-4/5">
				<Input.TextArea
					value={foods}
					autoSize={{ minRows: 4 }}
					className="bg-white bg-opacity-70"
					onChange={e => changeContent(e.target.value)}
				></Input.TextArea>
			</div>
		</div>
	)
}

export default createAppModal(App)
