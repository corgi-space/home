import type { FC } from "react"
import { Layout as AntdLayout, Menu } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import {
	CloudServerOutlined,
	HomeOutlined,
	MacCommandOutlined,
	PayCircleOutlined
} from "@ant-design/icons"
import Tools from "./components/Tools"
import Wallpaper from "./components/Wallpaper"

const { Header } = AntdLayout

const HeaderItems = [
	{ icon: <HomeOutlined size={48} />, key: "home", label: "首页" },
	{ icon: <CloudServerOutlined size={48} />, key: "devOps", label: "运维" },
	{ icon: <MacCommandOutlined size={48} />, key: "mall", label: "商城" }
]

export const Layout: FC = () => {
	const navigate = useNavigate()

	// const {
	// 	token: { colorBgContainer }
	// } = theme.useToken()

	const clickItem = ({ key }) => {
		navigate(key)
	}

	return (
		<AntdLayout className="bg-transparent">
			<Wallpaper />
			<Header className="glass flex justify-between px-4">
				<div className="h-full px-2 py-3">
					<img src="/logo.png" className="h-full" />
				</div>
				<Menu
					mode="horizontal"
					defaultSelectedKeys={["home"]}
					items={HeaderItems}
					onClick={clickItem}
					className="flex-1 bg-transparent px-5"
				/>
				<Tools />
			</Header>
			<AntdLayout className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-transparent p-4">
				<Outlet />
			</AntdLayout>
		</AntdLayout>
	)
}
