import { Suspense, memo, useMemo } from "react"
import { isString } from "lodash-es"
import { SizeConfig } from "../Apps"
import LoadingApp from "./LoadingApp"
import { IAppMeta } from "../type"

function AppItem({ item }: { item: IAppMeta }) {
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
			width: `calc(${col} * var(--app-size) + ${col - 1} * var(--app-gap))`,
			height: `calc(${row} * var(--app-size) + ${row - 1} * var(--app-gap))`
		}
	}, [item.size])

	const App = useMemo(() => item["index"], [])
	return (
		<div className="appItem" style={style}>
			<Suspense fallback={<LoadingApp />}>
				<App size={item.size}></App>
			</Suspense>
			<p className="appItem-title">{item.name}</p>
		</div>
	)
}

export default memo(AppItem)
