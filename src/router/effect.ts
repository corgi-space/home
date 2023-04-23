// 控制router的业务逻辑

import { IMenu } from "@/api/system/type"
import { IRouteObject, ISearchItem } from "@/types"
import { recursionFilter, recursionFn } from "@/utils"
import { store } from "@/store"
import { cloneDeep } from "lodash"
import { HomeRouter, getRouterArray } from "."
import { lazy } from "react"
import { Load } from "./load"

export function loadView(view: () => Promise<any>) {
	return Load(lazy(view))
}

function forMatPath(a: string) {
	return a.replaceAll("/", "")
}

// 处理权限控制的函数
/**
 * 从menu中匹配出routerArray中的路由
 * @param param0
 */
export const filterRouter = (
	routerArray: IRouteObject[] | undefined,
	menu: IMenu[] | undefined,
	result: IRouteObject[] = []
): IRouteObject[] => {
	if (!routerArray || !routerArray.length) return result

	/**
	 * 对于没有配置权限的
	 *
	 * 提取可能含有的公用路由
	 */
	if (!menu || !menu.length) {
		const publicRouter = recursionFilter<IRouteObject>(routerArray, a => !!a.meta?.public, "out")

		publicRouter && result.push(...publicRouter)
		return result
	}

	routerArray.forEach(item => {
		const _curMenu = menu.find(e => forMatPath(e.path) === forMatPath(item.name))

		// 更新名称， 与后台返回保持一致
		if (_curMenu) {
			// 后台配置了权限
			if (item.meta) {
				item.meta.title = _curMenu.name || item.meta.title
			}

			item.children = filterRouter(item.children, _curMenu.list, [])
			result.push(item)
		} else {
			// 后台没有配置权限
			/**
			 * 只有先满足父级，才能具有子级
			 */
			const publicRouter = recursionFilter<IRouteObject>([item], a => !!a.meta?.public, "out")

			publicRouter && result.push(...publicRouter)
		}
	})

	return result
}

const roleMenuMap = new Map<number, IRouteObject[]>()

/**
 * 路由列表
 */
export function getRouterList(): IRouteObject[] {
	const { menu, userInfo } = store.getState().userStore
	if (userInfo && roleMenuMap.has(userInfo.roleId)) {
		return cloneDeep(roleMenuMap.get(userInfo.roleId) as IRouteObject[])
	}
	let userRouterList: IRouteObject[] = []
	if (menu.length) {
		userRouterList = filterRouter(getRouterArray(), menu)
	}

	userRouterList.unshift(HomeRouter)

	if (userInfo?.roleId) {
		roleMenuMap.set(userInfo?.roleId, userRouterList)
	}

	return cloneDeep(userRouterList)
}

/**
 * 用于搜索页面
 */
const roleSearchMap = new Map<number, ISearchItem[]>()

export function getSearchList(roleId): ISearchItem[] {
	if (roleId) {
		if (roleSearchMap.has(roleId)) {
			return roleSearchMap.get(roleId) as ISearchItem[]
		} else {
			const userRouterList = roleMenuMap.get(roleId)

			if (userRouterList) {
				const searchList: ISearchItem[] = []

				recursionFn(userRouterList, item => {
					if (item.meta && item.meta.search) {
						searchList.push(...item.meta.search)
					}

					return item
				})

				roleSearchMap.set(roleId, searchList)
				return searchList
			} else {
				return []
			}
		}
	}

	return []
}
