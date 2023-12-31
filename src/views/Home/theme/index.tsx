import { ToolOutlined } from "@ant-design/icons"
import { ReactNode, useState, useMemo, useRef, useEffect } from "react"
import createDrawer, { DrawerRef } from "@/components/CreateDrawer"
import { Button } from "antd"
import { useSessionStorageState } from "ahooks"
import themeList, { IThemeKeys } from "./list"

type IThemeDrawerOptions = {
	themeKey: IThemeKeys | undefined
	setThemeKey: React.Dispatch<React.SetStateAction<IThemeKeys>>
}
type IThemeDrawer = DrawerRef<IThemeDrawerOptions>
const ThemeDrawer = createDrawer<{}, IThemeDrawerOptions>(
	({ options, handle }) => {
		const [curSelectTheme, setCurSelectTheme] = useState<IThemeKeys>()

		useEffect(() => {
			if (options?.themeKey) {
				setCurSelectTheme(options.themeKey)
			}
		}, [options])

		const submit = () => {
			if (curSelectTheme) {
				options?.setThemeKey(curSelectTheme)
			}

			handle.close()
		}

		return (
			<div>
				<h3>选择主题</h3>
				<div>
					{themeList.map(item => (
						<div
							key={item.key}
							className={curSelectTheme === item.key ? "text-red-500" : ""}
							onClick={() => setCurSelectTheme(item.key)}
						>
							{item.name}
						</div>
					))}
				</div>

				<Button type="primary" onClick={submit}>
					确定
				</Button>
			</div>
		)
	},
	{
		title: "修改主题"
	}
)

function index(props: { children: ReactNode }) {
	const drawerRef = useRef<IThemeDrawer>(null)
	const [themeKey, setThemeKey] = useSessionStorageState<IThemeKeys>(
		"homeTheme",
		{
			defaultValue: "normal"
		}
	)

	const container = useMemo(() => {
		return themeList.find(item => item.key === themeKey)!.theme
	}, [themeKey])

	const openDrawer = () => {
		drawerRef.current?.open({
			themeKey,
			setThemeKey: setThemeKey as React.Dispatch<
				React.SetStateAction<IThemeKeys>
			>
		})
	}

	return (
		<div className="theme-container relative h-full w-full">
			<ToolOutlined
				className="absolute right-2 top-2 z-10"
				onClick={openDrawer}
			/>

			{container(props)}

			<ThemeDrawer ref={drawerRef} />
		</div>
	)
}

export default index
