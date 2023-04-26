import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"
// import { AliveScope } from "react-activation"
import dayjs from "dayjs"
import { getThemeConfig } from "./styles/theme"
import AppRouter from "@/router"
import { useAppSelector } from "@/store/index"
import "dayjs/locale/zh-cn"
import { useMemo } from "react"

dayjs.locale("zh-cn")

function App() {
	const { theme, themeColor } = useAppSelector(state => state.appStore)

	const themeConfig = useMemo(
		() => getThemeConfig(theme, themeColor),
		[theme, themeColor]
	)
	return (
		<ConfigProvider locale={zhCN} theme={themeConfig}>
			{/* <AliveScope> */}
			<AppRouter />
			{/* </AliveScope> */}
		</ConfigProvider>
	)
}

export default App
