import { BellOutlined } from "@ant-design/icons"
import { Popover } from "antd"
import { aClassName } from "../Tools"
import NoticeDetails, {
	IDrawerOptions,
	ISettingDrawerRef
} from "./NoticeDetails"
import NoticeList from "./NoticeList"
import { createContext, useRef } from "react"

export const MessageContext = createContext<{
	openDrawer: (type: IDrawerOptions["type"], id?: number) => void
} | null>(null)

function MessageBox() {
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
				content={NoticeList}
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
