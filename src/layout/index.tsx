import type { FC } from "react"
import { Layout as AntdLayout, Menu, theme } from "antd"
import { Outlet } from "react-router-dom"
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
	{ icon: <MacCommandOutlined size={48} />, key: "operate", label: "运营" },
	{ icon: <PayCircleOutlined size={48} />, key: "sale", label: "销售" }
]

export const Layout: FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	console.log(colorBgContainer)
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
