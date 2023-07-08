import type { FC } from "react"
import { Suspense, lazy } from "react"
// import NProgress from "nprogress"
// import "nprogress/nprogress.css"
import { Spin } from "antd"

export function loadView(
	view: () => Promise<{
		default: React.ComponentType<unknown>
	}>
) {
	return Load(lazy(view))
}

export function Loading() {
	// NProgress.start()
	// useEffect(() => {
	// 	return () => NProgress.done()
	// }, [])

	return <Spin size="large"></Spin>
}

export function Load(Comp: FC) {
	return (
		<Suspense fallback={<Loading />}>
			<Comp />
		</Suspense>
	)
}
