import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"

function Tools(props: { className?: string }) {
	return (
		<div
			className={
				(props.className || "") +
				" mx-auto h-[--wharf-height] w-fit rounded-full bg-[rgba(0,0,0,.6)] px-5 py-2"
			}
		>
			<Avatar size={44} icon={<UserOutlined />} />
		</div>
	)
}

export default Tools
