/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, FC } from "react"
import { Suspense, lazy } from "react"
// import NProgress from "nprogress"
// import "nprogress/nprogress.css"
import { Spin } from "antd"

export function loadView(
	view: () => Promise<{ default: ComponentType<any> }>,
	props?: any
) {
	return Load(lazy(view), props)
}

export function Loading() {
	// NProgress.start()
	// useEffect(() => {
	// 	return () => NProgress.done()
	// }, [])

	return <Spin size="large"></Spin>
}

export function Load(Comp: FC<any>, props?: any) {
	return (
		<Suspense fallback={<Loading />}>
			<Comp {...props} />
		</Suspense>
	)
}
