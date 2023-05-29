import { BellOutlined } from "@ant-design/icons"
import { Popover, Tabs, TabsProps } from "antd"
import { aClassName } from "../Tools"
import NoticeDetails, {
	IDrawerOptions,
	ISettingDrawerRef
} from "./NoticeDetails"
import MessageList from "./MessageList"
import NoticeList from "./NoticeList"
import { createContext, useRef } from "react"

export const MessageContext = createContext<{
	openDrawer: (type: IDrawerOptions["type"], id?: number) => void
} | null>(null)

function MessageBox() {
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
				destroyInactiveTabPane
			/>
		)
	}

	const noticeRef = useRef<ISettingDrawerRef>(null)

	const openDrawer = (type: IDrawerOptions["type"], id?: number) => {
		noticeRef.current?.open({
			type,
			id
		})
	}

	return (
		<MessageContext.Provider
			value={{
				openDrawer
			}}
		>
			<Popover
				placement="bottomRight"
				content={MessageBoxContent}
				trigger="click"
				destroyTooltipOnHide
			>
				<a className={aClassName} title="消息">
					<BellOutlined />
				</a>
			</Popover>

			<NoticeDetails ref={noticeRef} />
		</MessageContext.Provider>
	)
}

export default MessageBox
