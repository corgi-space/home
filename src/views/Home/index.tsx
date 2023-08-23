import Theme from "./theme"
import "./style/index.scss"
import { defaultList } from "./appList"
import { useLocalStorageState } from "ahooks"
import AppItem from "./components/AppItem"
import { AppMetas, Apps } from "./Apps/index"
import { useState, useEffect, useMemo } from "react"
import { IAppBaseItem, IAppIcon } from "./type"

/**
 * 等待Apps加载完成
 */
function useLoadApps() {
	const [loadStatus, setLoadStatus] = useState(!!Object.keys(Apps).length)

	useEffect(() => {
		if (!loadStatus) {
			const timer = setInterval(() => {
				const appMatasLength = Object.keys(AppMetas).length
				const appLength = Object.keys(Apps).length

				if (appLength && appMatasLength) {
					setLoadStatus(true)
					clearTimeout(timer)
				}
			}, 60)
			return () => clearInterval(timer)
		}
	}, [])

	return loadStatus
}

function Home() {
	const loadStatus = useLoadApps()
	const [list] = useLocalStorageState<IAppBaseItem[]>("appList", {
		defaultValue: defaultList
	})

	const AppList = useMemo<IAppIcon[] | null>(() => {
		if (!list || !loadStatus) return null
		const a = list.map(item => {
			return {
				...item,
				...AppMetas[item.app]
			}
		})
		return a
	}, [list, loadStatus])

	return (
		<Theme>
			<div className="grid-container h-full w-full">
				{loadStatus
					? AppList &&
					  AppList.map(item => <AppItem key={item.id} item={item} />)
					: null}
			</div>
		</Theme>
	)
}

export default Home
