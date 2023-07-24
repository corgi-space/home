// import Theme from "./theme"
import "./style/index.scss"
import { IAppIcon, defaultList } from "./appList"
import { useLocalStorageState } from "ahooks"
import AppItem from "./components/AppItem"
import { Apps } from "./Apps/index"

function useLoadApps() {
	const [loadStatus, setLoadStatus] = useState(false)

	return loadStatus
}

function Home() {
	const [list] = useLocalStorageState<IAppIcon[]>("appList", {
		defaultValue: defaultList
	})

	console.log(Apps)
	return (
		// <Theme>
		<div className="grid-container h-full w-full">
			{list && list.map(item => <AppItem key={item.id} item={item} />)}
		</div>
		// </Theme>
	)
}

export default Home
