import { MouseEvent } from "react"
import EatApp from "./app"
import useEat from "./useEat"
import BgPath from "./assets/bg.svg"
import { Button } from "antd"

function index() {
	const { run, runing, content } = useEat()

	const openApp = () => {
		EatApp()
	}

	const clickRun = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		run()
	}

	return (
		<div
			className="appItem-icon flex cursor-pointer flex-col items-center justify-center"
			style={{
				backgroundImage: `url(${BgPath})`,
				backgroundPosition: "-160px -60px",
				backgroundSize: "cover"
			}}
			onClick={openApp}
		>
			<h3>{content}</h3>
			<Button
				type={runing ? "default" : "primary"}
				onClick={clickRun}
				className="mt-3 w-1/2 !rounded-xl"
			>
				{runing ? "停止" : "开始"}
			</Button>
		</div>
	)
}

export default index
