import { AppName } from "@/config"
import NavList from "./NavList"
import Tools from "./Tools"
import UserBox from "./UserBox"
import { useEffect, useState } from "react"
import useAppStore from "@/store/appStore"

const lightBg = "linear-gradient(135deg, #f6fcff, #fff, #f6fcff)"
const darkBg =
	"linear-gradient(135deg, rgb(30 43 50), rgb(51, 51, 51), rgb(30 43 50))"

function index() {
	const { theme } = useAppStore()
	const [bgColor, setBgColor] = useState<string>(lightBg)

	useEffect(() => {
		setBgColor(theme === "light" ? lightBg : darkBg)
	}, [theme])

	return (
		<div
			style={{
				background: bgColor
			}}
			className="group fixed left-0 top-0 z-10 box-border flex h-full w-[var(--sider-initWidth)] flex-col overflow-hidden shadow transition-all hover:w-[180px] hover:px-3"
		>
			<div className="mt-4 box-border flex h-[40px] items-center overflow-hidden whitespace-nowrap px-[9px]">
				<img
					src="/logo.png"
					className="mr-3 w-8 shrink-0 transition-all group-hover:w-12"
				/>
				<p className="my-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					{AppName}
				</p>
			</div>

			<NavList />
			<Tools />
			<UserBox />
		</div>
	)
}

export default index
