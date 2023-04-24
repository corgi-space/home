import type { FC } from "react"
import { Layout as AntdLayout, Menu, theme } from "antd"
import { Outlet } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"
import Tools from "./components/Tools"

const { Header } = AntdLayout

const HeaderItems = [
	{ icon: <HomeOutlined size={48} />, key: "home", label: "首页" }
]

export const Layout: FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	return (
		<AntdLayout>
			<Header
				className="flex justify-between"
				style={{ background: colorBgContainer }}
			>
				<div className="h-full py-2">
					<img src="/logo.png" className="h-full" />
				</div>
				<Menu
					mode="horizontal"
					defaultSelectedKeys={["2"]}
					items={HeaderItems}
					className="flex-1 px-5"
				/>
				<Tools />
			</Header>
			<AntdLayout className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden p-4">
				<Outlet />
			</AntdLayout>
		</AntdLayout>
	)
}
