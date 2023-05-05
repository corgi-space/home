import { BellOutlined } from "@ant-design/icons"
import { Popover, Tabs, TabsProps } from "antd"
import { aClassName } from "./Tools"

const MessageBoxContent = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "通知",
			children: "这是通知"
		},
		{
			key: "2",
			label: "消息",
			children: "这是消息"
		}
	]

	return <Tabs defaultActiveKey="1" items={items} />
}

function MessageBox() {
	return (
		<Popover placement="bottom" content={MessageBoxContent} trigger="click">
			<a className={aClassName} title="消息">
				<BellOutlined />
			</a>
		</Popover>
	)
}

export default MessageBox
