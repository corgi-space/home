import { loadView } from "@/router/load"

const list = [
	{
		key: "normal",
		name: "默认",
		photo: "",
		theme: (props: unknown) => loadView(() => import("./Normal"), props)
	},
	{
		key: "mario",
		name: "马里奥",
		photo: "",
		theme: (props: unknown) => loadView(() => import("./Mario"), props)
	}
] as const

export type IThemeKeys = (typeof list)[number]["key"]

export default list
