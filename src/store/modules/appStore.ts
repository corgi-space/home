import { createSlice } from "@reduxjs/toolkit"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import type { ITheme } from "@/types/index"

function initialState(): {
	theme: ITheme
	themeColor: string
} {
	let { theme } = getLocalStorage(["theme"])
	theme = theme || "light"
	document.documentElement.className = theme
	return {
		theme,
		themeColor: "#ff7904"
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
		}
	}
})

export const { changeTheme } = appStore.actions
export default appStore.reducer
