import { create } from "zustand"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import type { ITheme } from "@/types/index"
import { ThemeColor } from "@/config"

type State = {
	theme: ITheme
	themeColor: string
}

type Action = {
	changeTheme: (val: State["theme"]) => void
	changeThemeColor: (val: State["themeColor"]) => void
}

const useAppStore = create<State & Action>(set => ({
	theme: getLocalStorage<ITheme>("theme") || "light",
	themeColor: getLocalStorage<string>("themeColor") || ThemeColor,

	changeTheme: (val: ITheme) => {
		setLocalStorage("theme", val)
		set(() => ({ theme: val }))
	},
	changeThemeColor: (val: string) => {
		setLocalStorage("themeColor", val)
		set(() => ({ themeColor: val }))
	}
}))

export default useAppStore
