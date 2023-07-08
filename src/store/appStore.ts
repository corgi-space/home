import { create } from "zustand"
import { getStorage, setStorage } from "@/utils/storage"
import type { IPosition, ITheme } from "@/types/index"
import axios from "axios"
import { WeatherKey } from "@/config"

type State = {
	theme: ITheme
	position: IPosition | null
}

type Action = {
	change: <T extends keyof State>(key: T, val: State[T]) => void
	changeTheme: (val?: State["theme"]) => void
}

const useAppStore = create<State & Action>((set, get) => ({
	theme: getStorage<ITheme>("theme") || "light",
	position: null,

	change: (key, data) => {
		setStorage({ key, data })
		set(() => ({ [key]: data }))
	},

	changeTheme: val => {
		let curTheme: State["theme"] =
			val ?? get().theme === "light" ? "dark" : "light"

		set(() => ({
			theme: curTheme
		}))

		updateHtmlTheme(curTheme)
		setStorage({ key: "theme", data: curTheme })
	}
}))

const updateHtmlTheme = (val: string) => {
	document.documentElement.className = val
}

updateHtmlTheme(useAppStore.getState().theme)

/**
 * 根据IP获取当前地址
 * @param position
 */
const savePosition = async (position: string) => {
	const res = await axios
		.get(
			`https://geoapi.qweather.com/v2/city/lookup?location=${position}&key=${WeatherKey}&lang=zh`
		)
		.then(res => {
			const location = res.data.location[0]

			return {
				name: location.name,
				city: location.adm2,
				cityId: location.id
			}
		})
	setStorage({
		key: "position",
		data: res,
		fn: sessionStorage
	})
	useAppStore.setState(() => ({ position: res }))
}

const getPosition = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				savePosition(position.coords.longitude + "," + position.coords.latitude)
			},
			error => {
				console.log(error)
			}
		)
	} else {
		console.log("no navigator.geolocation")
	}
}

getPosition()

export default useAppStore
