import { BellOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Popover, Tabs, TabsProps } from "antd"
import { aClassName } from "../Tools"
import NoticeDetails, {
	IDrawerOptions,
	ISettingDrawerRef
} from "./NoticeDetails"
import MessageList from "./MessageList"
import NoticeList from "./NoticeList"
import Auth from "@/components/Auth"
import { useRef, useState } from "react"

function MessageBox() {
	const noticeRef = useRef<ISettingDrawerRef>(null)

	const [clicked, setClicked] = useState(false)

	const handleClickChange = (open: boolean) => {
		setClicked(open)
	}

	const openDrawer = (type: IDrawerOptions["type"], id?: number) => {
		setClicked(false)
		noticeRef.current?.open({
			type,
			id
		})
	}

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
						<Button
							shape="circle"
							icon={<PlusOutlined />}
							title="添加通知"
							onClick={() => openDrawer("create")}
						/>
					</Auth>
				}
			/>
		)
	}

	return (
		<>
			<Popover
				placement="bottomRight"
				content={MessageBoxContent}
				trigger="click"
				open={clicked}
				onOpenChange={handleClickChange}
			>
				<a className={aClassName} title="消息">
					<BellOutlined />
				</a>
			</Popover>

			<NoticeDetails ref={noticeRef} />
		</>
	)
}

export default MessageBox
