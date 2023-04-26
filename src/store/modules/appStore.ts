import { createSlice } from "@reduxjs/toolkit"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import type { ITheme } from "@/types/index"
import { ThemeColor } from "@/config"

function initialState(): {
	theme: ITheme
	themeColor: string
} {
	let theme = getLocalStorage<ITheme>("theme")
	theme = theme || "light"
	document.documentElement.className = theme

	let themeColor = getLocalStorage<string>("themeColor")
	themeColor = themeColor || ThemeColor

	return {
		theme,
		themeColor
	}
}

const appStore = createSlice({
	name: "appStore",
	initialState: initialState(),
	reducers: {
		changeTheme(state, { payload }: { payload: ITheme }) {
			state.theme = payload
			document.documentElement.className = payload
			setLocalStorage("theme", payload)
		},
		changeThemeColor(state, { payload }: { payload: string }) {
			state.themeColor = payload
		}
	}
})

export const { changeTheme, changeThemeColor } = appStore.actions
export default appStore.reducer
