import { Suspense, memo, useMemo } from "react"
import { isString } from "lodash-es"
import { Apps, SizeConfig } from "../Apps"
import LoadingApp from "./LoadingApp"
import { IAppIcon } from "../type"

function AppItem({ item }: { item: IAppIcon }) {
	const style = useMemo<React.CSSProperties>(() => {
		let col, row
		if (isString(item.size)) {
			;[col, row] = SizeConfig[item.size]
		} else {
			;[col, row] = item.size
		}

		return {
			gridColumn: `span ${col}`,
			gridRow: `span ${row}`,
			fontSize: item.size === "small" ? "12px" : "14px",
			width: `cacl(${col} * var(--app-size))`,
			height: `cacl(${row} * var(--app-size))`
		}
	}, [item.size])

	const App = Apps[item.app]

	return (
		<div key={item.id} className="appItem" style={style}>
			<Suspense fallback={<LoadingApp />}>
				<App.content size={item.size}></App.content>
			</Suspense>
			<p className="appItem-title">{App.name}</p>
		</div>
	)
}

export default memo(AppItem)
