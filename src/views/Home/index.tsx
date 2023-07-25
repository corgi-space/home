import Theme from "./theme"
import "./style/index.scss"
import { IAppIcon, defaultList } from "./appList"
import { useLocalStorageState } from "ahooks"
import AppItem from "./components/AppItem"
import { Apps } from "./Apps/index"
import { useState, useEffect } from "react"

/**
 * 等待Apps加载完成
 */
function useLoadApps() {
	const [loadStatus, setLoadStatus] = useState(!!Object.keys(Apps).length)

	useEffect(() => {
		if (!loadStatus) {
			const timer = setInterval(() => {
				const appLength = Object.keys(Apps).length

				if (appLength) {
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
	const [list] = useLocalStorageState<IAppIcon[]>("appList", {
		defaultValue: defaultList
	})

	return (
		<Theme>
			<div className="grid-container h-full w-full">
				{loadStatus
					? list && list.map(item => <AppItem key={item.id} item={item} />)
					: null}
			</div>
		</Theme>
	)
}

export default Home
