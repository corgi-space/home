import { ToolOutlined } from "@ant-design/icons"
import Mario from "./Mario"
import { ReactNode } from "react"
import "../style/index.scss"

function index(props: { children: ReactNode }) {
	return (
		<div className={"theme-container relative h-full w-full"}>
			<ToolOutlined className="absolute right-2 top-2 z-10" />

			<Mario {...props} />
		</div>
	)
}

export default index
