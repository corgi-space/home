import { BellOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Popover, Tabs, TabsProps } from "antd"
import { aClassName } from "../Tools"
import MessageList from "./MessageList"
import NoticeList from "./NoticeList"
import Auth from "@/components/Auth"

const MessageBoxContent = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "消息",
			children: <MessageList />
		},
		{
			key: "2",
			label: "通知",
			children: <NoticeList />
		}
	]

	return (
		<Tabs
			defaultActiveKey="1"
			items={items}
			className="w-[400px]"
			tabBarExtraContent={
				<Auth roles={[1, 2]}>
					<Button shape="circle" icon={<PlusOutlined />} title="添加通知" />
				</Auth>
			}
		/>
	)
}

function MessageBox() {
	return (
		<Popover
			placement="bottomRight"
			content={MessageBoxContent}
			trigger="click"
		>
			<a className={aClassName} title="消息">
				<BellOutlined />
			</a>
		</Popover>
	)
}

export default MessageBox
