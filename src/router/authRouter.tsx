import { useLocation, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/store/index"
import { MenuAction } from "@/store/modules/userStore"
import { Loading } from "./load"
import { FC } from "react"

const whiteList = ["/login", "/test"]

/**
 * @description 路由守卫组件
 * */
function AuthRouterWrapped(WrappedComponent: FC) {
	const AuthRouter = () => {
		const { pathname } = useLocation()
		const { userInfo, menu, menuRequest } = useAppSelector(state => state.userStore)
		const dispatch = useAppDispatch()

		// * 判断是否有Token
		if (!userInfo || !userInfo.token) {
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
		if (!menu.length) {
			// 如果已经发送请求，就不再调用了
			if (!menuRequest) {
				dispatch(MenuAction({ roleId: userInfo.roleId }))
			}

			return <Loading />
		}

		// * 当前账号有权限返回 Router，正常访问页面
		return <WrappedComponent />
	}

	return AuthRouter
}

export default AuthRouterWrapped
