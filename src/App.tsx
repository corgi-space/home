import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"
import dayjs from "dayjs"
import { getThemeConfig } from "./styles/theme"
import AppRouter from "@/router"
import useAppStore from "@/store/appStore"
import "dayjs/locale/zh-cn"
import { useMemo } from "react"
dayjs.locale("zh-cn")

function App() {
	const { theme } = useAppStore()

	const themeConfig = useMemo(() => getThemeConfig(theme), [theme])
	return (
		<ConfigProvider locale={zhCN} theme={themeConfig} componentSize="small">
			{/* <AliveScope> */}
			<AppRouter />
			{/* </AliveScope> */}
		</ConfigProvider>
	)
}

export default App
