import { Navigate, useRoutes } from "react-router-dom"
import Login from "@/views/Login"

// import type { IRouteObject } from "@/types/index"
import NotFound from "@/views/404"
import Test from "@/views/Test"
import { Layout } from "@/layout"
import Home from "@/views/Home"
import authRouter from "./authRouter"
// export { getRouterArray } from "./routerArray"

export const RootRouter = [
	{
		path: "/",
		name: "dashboard",
		element: <Navigate to="/home" />
	},
	{
		path: "/home",
		name: "home",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Home />
			}
		]
	},
	{
		path: "/test",
		name: "test",
		element: <Test />
	},
	{
		path: "/login",
		name: "login",
		element: <Login />
	},
	{
		name: "NotFound",
		path: "/404",
		element: <NotFound />
	},
	{
		path: "*",
		name: "*",
		element: <Navigate to="/404" replace />
	}
]

/**
 * 首页
 */
// export const HomeRouter = {
// 	path: "/dashboard",
// 	name: "dashboard",
// 	element: (
// 		<Layout>
// 			<Dashboard />
// 		</Layout>
// 	),
// 	meta: {
// 		title: "首页",
// 		icon: <HomeOutlined />
// 	}
// }

// * 导入所有router
function useAppRouter() {
	return useRoutes(RootRouter)
}

export default authRouter(useAppRouter)
