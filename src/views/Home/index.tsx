import Theme from "./theme"
import "./style/index.scss"
import { IAppIcon, defaultList } from "./appList"
import { useLocalStorageState } from "ahooks"
import AppItem from "./components/AppItem"

function Home() {
	const [list] = useLocalStorageState<IAppIcon[]>("appList", {
		defaultValue: defaultList
	})
	return (
		<Theme>
			<div className="grid-container h-full w-full">
				{list && list.map(item => <AppItem key={item.id} item={item} />)}
			</div>
		</Theme>
	)
}

export default Home
