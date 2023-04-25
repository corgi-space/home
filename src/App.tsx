import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"

// import { AliveScope } from "react-activation"
import dayjs from "dayjs"
import { getThemeConfig } from "./styles/theme"
import AppRouter from "@/router"
import { useAppSelector } from "@/store/index"
import "dayjs/locale/zh-cn"

dayjs.locale("zh-cn")

function App() {
	const { theme, themeColor } = useAppSelector(state => state.appStore)

	const themeConfig = getThemeConfig(theme, themeColor)

	return (
		<ConfigProvider locale={zhCN} theme={themeConfig}>
			{/* <AliveScope> */}
			<AppRouter />
			{/* </AliveScope> */}
		</ConfigProvider>
	)
}

export default App
