import { Avatar, Dropdown, Space } from "antd"
import {
	DownOutlined,
	GithubOutlined,
	InfoCircleOutlined,
	SettingOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import useUserStore from "@/store/userStore"
import MessageBox from "./Message"
import { useRef } from "react"
import SettingDrawer, {
	IDrawerOptions,
	ISettingDrawerRef
} from "./SettingDrawer"

const items: MenuProps["items"] = [
	{
		key: "logged",
		danger: true,
		label: "退出登录"
	}
]

export const aClassName =
	"block h-full cursor-pointer px-2 text-black text-[18px]"

function Tools(props: { className?: string }) {
	const { userInfo, clear } = useUserStore()

	const SettingDrawerRef = useRef<ISettingDrawerRef>(null)

	const onClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "logged":
				clear()
				break
		}
	}

	const openSettingDrawer = (key: IDrawerOptions) => {
		SettingDrawerRef.current?.open(key)
	}

	return (
		<Space size="middle" align="center" className={props.className}>
			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				className={aClassName}
				title="Github"
			>
				<GithubOutlined />
			</a>

			<a
				className={aClassName}
				title="关于"
				onClick={() => openSettingDrawer("info")}
			>
				<InfoCircleOutlined />
			</a>

			<a
				className={aClassName}
				title="设置"
				onClick={() => openSettingDrawer("setting")}
			>
				<SettingOutlined />
			</a>

			<MessageBox />

			<Dropdown
				menu={{ items, onClick }}
				placement="bottom"
				arrow={{ pointAtCenter: true }}
			>
				<a className="cursor-pointer text-black">
					<Space align="center">
						<Avatar src={userInfo?.photo} size="large" />

						{userInfo?.name}
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>

			<SettingDrawer ref={SettingDrawerRef} />
		</Space>
	)
}

export default Tools
