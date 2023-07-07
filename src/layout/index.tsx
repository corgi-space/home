import type { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
	CloudServerOutlined,
	HomeOutlined,
	MacCommandOutlined
} from "@ant-design/icons"
import Tools from "./components/Tools"
import Wallpaper from "./components/Wallpaper"
import Sider from "./components/Sider"

export const Layout: FC = () => {
	const navigate = useNavigate()

	// const {
	// 	token: { colorBgContainer }
	// } = theme.useToken()

	return (
		<div className="flex h-[100vh]">
			{/* <Wallpaper /> */}
			{/* <Header className="glass flex justify-between px-4">
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
			</Header> */}
			<Sider />
			<div className="from-light-50 h-full flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-br to-sky-50 pl-[var(--sider-initWidth)]">
				<Outlet />
			</div>
		</div>
	)
}
