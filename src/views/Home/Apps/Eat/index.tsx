import { MouseEvent } from "react"
import useEat from "./useEat"
import BgPath from "./assets/bg.svg"
import { Button } from "antd"
import { useOpenApp } from "../../hooks/CreateAppModal"

function index() {
	const { run, runing, content } = useEat()

	const open = useOpenApp(() => import("./app"))

	const clickRun = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		run()
	}

	return (
		<div
			className="appItem-icon bg-theme flex cursor-pointer flex-col items-center justify-center"
			style={{
				backgroundImage: `url(${BgPath})`,
				backgroundPosition: "-160px -60px",
				backgroundSize: "cover"
			}}
			onClick={open}
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
