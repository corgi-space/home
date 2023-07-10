import { ToolOutlined } from "@ant-design/icons"
import Mario from "./Mario"
import { ReactNode } from "react"

function index(props: { children: ReactNode }) {
	return (
		<div className="relative h-full w-full">
			<ToolOutlined className="absolute right-2 top-2" />

			<Mario {...props} />
		</div>
	)
}

export default index
