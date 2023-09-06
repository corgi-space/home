import Theme from "./theme"
import "./style/index.scss"
import AppItem from "./components/AppItem"
// import { useEffect } from "react"
// import { IAppMeta } from "./type"
// import { useSet } from "ahooks"
// const metaModules = import.meta.glob("./Apps/*/meta.ts")
import { AppMetas } from "./Apps"

/**
 * 等待Apps加载完成
 */
// function useloadApps() {
// 	const [AppList, { add }] = useSet<IAppMeta>([])

// 	useEffect(() => {
// 		Object.keys(metaModules).forEach(async path => {
// 			metaModules[path]().then(mod => {
// 				const meta = (mod as { default: IAppMeta }).default
// 				add(meta)
// 			})
// 		})
// 	}, [])

// 	return Array.from(AppList)
// }

function Home() {
	return (
		<Theme>
			<div className="grid-container w-full">
				{AppMetas.map(item => (
					<AppItem key={item.app} item={item} />
				))}
			</div>
		</Theme>
	)
}

export default Home
