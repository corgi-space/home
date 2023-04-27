import { ConfigProvider, message } from "antd"
import zhCN from "antd/lib/locale/zh_CN"
// import { AliveScope } from "react-activation"
import dayjs from "dayjs"
import { getThemeConfig } from "./styles/theme"
import AppRouter from "@/router"
import useAppStore from "@/store/appStore"
import "dayjs/locale/zh-cn"
import { createContext, useMemo } from "react"
import { MessageInstance } from "antd/es/message/interface"

export const AntdContext = createContext<{
	messageApi: MessageInstance
} | null>(null)

dayjs.locale("zh-cn")

function App() {
	const [messageApi, contextHolder] = message.useMessage()
	const { theme, themeColor } = useAppStore()

	const themeConfig = useMemo(
		() => getThemeConfig(theme, themeColor),
		[theme, themeColor]
	)
	return (
		<ConfigProvider locale={zhCN} theme={themeConfig}>
			<AntdContext.Provider value={{ messageApi }}>
				{/* <AliveScope> */}
				{contextHolder}
				<AppRouter />
			</AntdContext.Provider>
			{/* </AliveScope> */}
		</ConfigProvider>
	)
}

export default App
