import { Navigate, useLocation } from "react-router-dom"
import type { FC } from "react"
import useUserStore, { tokenComputed } from "@/store/userStore"
// import { MenuAction } from "@/store/modules/userStore"

const whiteList = ["/login", "/test"]

/**
 * @description 路由守卫组件
 * */
function AuthRouterWrapped(WrappedComponent: FC) {
	const AuthRouter = () => {
		const { pathname } = useLocation()
		const token = useUserStore(tokenComputed)
		// const dispatch = useAppDispatch()

		// * 判断是否有Token
		if (!token) {
			if (whiteList.includes(pathname)) {
				return <WrappedComponent />
			} else {
				return <Navigate to="/login" />
			}
		}

		if (pathname === "/login") {
			return <Navigate to="/" />
		}

		// 动态路由
		// if (!menu.length) {
		// 	// 如果已经发送请求，就不再调用了
		// 	if (!menuRequest) {
		// 		dispatch(MenuAction({ roleId: userInfo.roleId }))
		// 	}

		// 	return <Loading />
		// }

		// * 当前账号有权限返回 Router，正常访问页面
		return <WrappedComponent />
	}

	return AuthRouter
}

export default AuthRouterWrapped
