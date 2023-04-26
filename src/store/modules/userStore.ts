import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
	getLocalStorage,
	removeLocalStorege,
	setLocalStorage
} from "@/utils/storage"
import { UserLogin } from "@/api/user/index"
import { IUserInfo } from "@/api/user/types"
export const LoginAction = createAsyncThunk("user/login", UserLogin)

// export const MenuAction = createAsyncThunk("user/menu", GetUserMenuList)

function initialState(): {
	userInfo: IUserInfo | null
} {
	const userInfo = getLocalStorage<IUserInfo>("userInfo")

	return {
		userInfo: userInfo || null
	}
}

const userStore = createSlice({
	name: "userStore",
	initialState: initialState(),
	reducers: {
		clear(state) {
			// state.menu = []
			state.userInfo = null
			removeLocalStorege("userInfo")
			// removeLocalStorege("menu")
			// state.menuRequest = false
		}
	},
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(LoginAction.fulfilled, (state, action) => {
			const data = action.payload.data
			state.userInfo = data.userInfo
			setLocalStorage("userInfo", data.userInfo)
		})

		// builder.addCase(MenuAction.pending, state => {
		// 	state.menuRequest = true
		// })

		// builder.addCase(MenuAction.fulfilled, (state, action) => {
		// 	const data = action.payload.data
		// 	/**
		// 	 * 从接口中遍历出符合权限的菜单
		// 	 */
		// 	state.menu = recursionFilter(
		// 		data.menuInfos,
		// 		menu => {
		// 			return data.roleMenus.some(e => e.menuId === menu.menuId)
		// 		},
		// 		"in",
		// 		"list"
		// 	)
		// 	setLocalStorage("menu", state.menu)
		// })
		// builder.addCase(MenuAction.rejected, () => {
		// 	clear()
		// })
	}
})

export const { clear } = userStore.actions

export default userStore.reducer
