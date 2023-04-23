import { FC, Suspense, useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Spin } from "antd"

export const Loading = () => {
	NProgress.start()
	useEffect(() => {
		return () => NProgress.done()
	}, [])

	return <Spin size="large"></Spin>
}

export const Load = (Comp: FC) => {
	return (
		<Suspense fallback={<Loading />}>
			<Comp />
		</Suspense>
	)
}
