import type { FC } from "react"
import { Suspense, useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Spin } from "antd"

export function Loading() {
	NProgress.start()
	useEffect(() => {
		return () => NProgress.done()
	}, [])

	return <Spin size="large"></Spin>
}

export function Load(Comp: FC) {
	return (
		<Suspense fallback={<Loading />}>
			<Comp />
		</Suspense>
	)
}
