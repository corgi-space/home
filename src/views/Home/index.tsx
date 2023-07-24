// import Theme from "./theme"
import "./style/index.scss"
import { IAppIcon, defaultList } from "./appList"
import { useLocalStorageState } from "ahooks"
import AppItem from "./components/AppItem"
import { Apps } from "./Apps/index"
import { useState, useEffect } from "react"

function useLoadApps() {
	const [loadStatus, setLoadStatus] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			if (loadStatus) {
				clearTimeout(timer)
			} else {
				const appLength = Object.keys(Apps).length

				if (appLength) {
					setLoadStatus(true)
				}
			}
		}, 60)

		return () => clearInterval(timer)
	}, [])

	return loadStatus
}

function Home() {
	const loadStatus = useLoadApps()
	const [list] = useLocalStorageState<IAppIcon[]>("appList", {
		defaultValue: defaultList
	})

	console.log(Apps)
	return (
		// <Theme>
		<div className="grid-container h-full w-full">
			{loadStatus
				? list && list.map(item => <AppItem key={item.id} item={item} />)
				: null}
		</div>
		// </Theme>
	)
}

export default Home
