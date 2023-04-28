import createDrawer, { DrawerRef } from "@/components/CreateDrawer/index"
import {
	CloseOutlined,
	InfoCircleOutlined,
	SettingOutlined,
	UserOutlined
} from "@ant-design/icons"
import { Space } from "antd"
import { FC, ReactNode, useState, useEffect, useMemo } from "react"

export type IDrawerOptions = "user" | "setting" | "info"

type ITagItem = {
	key: IDrawerOptions
	icon: ReactNode
	title: string
	content: ReactNode
}

const TagItem: FC<{
	icon: ReactNode
	title?: string
	onClick: Function
	active: boolean
	className?: string
}> = props => {
	const { icon, onClick, title, active, className } = props

	const baseClassName =
		(className || "") +
		" flex h-[40px] cursor-pointer items-center justify-center rounded-bl-md rounded-tl-md text-center transition-all hover:bg-white hover:text-black"

	return (
		<div
			className={
				baseClassName +
				" " +
				(active ? "w-[60px] bg-white" : "w-[40px] bg-[#1b2835] text-white")
			}
			onClick={() => onClick()}
			title={title}
		>
			{icon}
		</div>
	)
}

export type ISettingDrawerRef = DrawerRef<IDrawerOptions>
const SettingDrawer = createDrawer<{}, IDrawerOptions>(
	({ options, handle }) => {
		const [active, setActive] = useState<IDrawerOptions>("user")

		const tags: ITagItem[] = [
			{ key: "user", icon: <UserOutlined />, title: "个人信息", content: null },
			{
				key: "setting",
				icon: <SettingOutlined />,
				title: "平台设置",
				content: null
			},
			{
				key: "info",
				icon: <InfoCircleOutlined />,
				title: "关于",
				content: null
			}
		]

		useEffect(() => {
			options && setActive(options)
		}, [options])

		const changeActive = (key: IDrawerOptions) => {
			setActive(key)
		}

		const activeTag = useMemo<ITagItem>(() => {
			return tags.find(e => e.key === active)!
		}, [active])

		return (
			<div
				className="flex h-full"
				style={{
					filter: "drop-shadow(-6px 0 16px rgba(0, 0, 0, 0.5))"
				}}
			>
				<Space
					size="middle"
					direction="vertical"
					className="flex w-[70px] items-end"
				>
					<TagItem
						icon={<CloseOutlined />}
						onClick={handle.close}
						active={false}
						className="mb-5"
					></TagItem>
					{tags.map(item => (
						<TagItem
							icon={item.icon}
							onClick={() => changeActive(item.key)}
							active={active === item.key}
							key={item.key}
							title={item.title}
						></TagItem>
					))}
				</Space>
				<div className="flex-1 bg-white">
					<div className="my-0 box-border h-[40px] flex-1 px-4 leading-[40px]">
						{activeTag.title}
					</div>
					<div className="box-border h-full flex-1 bg-white p-4">
						{activeTag.content}
					</div>
				</div>
			</div>
		)
	},
	{
		headerStyle: { display: "none" },
		width: "600px",
		contentWrapperStyle: { boxShadow: "none" },
		bodyStyle: { padding: "0px", overflow: "visible" },
		style: { background: "transparent", overflow: "visible" }
	}
)

export default SettingDrawer
