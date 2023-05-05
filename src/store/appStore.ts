import { create } from "zustand"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import type { IPosition, ITheme } from "@/types/index"
import { ThemeColor } from "@/config"
import { loadScript } from "@/utils"
import axios from "axios"
import { WeatherKey } from "@/config"

type State = {
	theme: ITheme
	themeColor: string
	position: IPosition | null
}

type Action = {
	change: <T extends keyof State>(key: T, val: State[T]) => void
}

/**
 * 根据IP获取当前地址
 * @param position
 */
window.savePosition = async (position: IPosition) => {
	const cityId = await axios
		.get(
			`https://geoapi.qweather.com/v2/city/lookup?location=${position.region}&adm=${position.city}&key=${WeatherKey}&lang=zh`
		)
		.then(res => res.data.location[0].id as number)
	position.cityId = cityId

	useAppStore.setState(() => ({ position: position }))
	sessionStorage.setItem("position", JSON.stringify(position))
}

const getPosition = () => {
	let position = sessionStorage.getItem("position")

	if (!position) {
		loadScript(`http://whois.pconline.com.cn/ipJson.jsp?callback=savePosition`)
		return null
	} else {
		return JSON.parse(position) as IPosition
	}
}

const useAppStore = create<State & Action>(set => ({
	theme: getLocalStorage<ITheme>("theme") || "light",
	themeColor: getLocalStorage<string>("themeColor") || ThemeColor,
	position: getPosition(),

	change: (key, val) => {
		setLocalStorage(key, val)
		set(() => ({ [key]: val }))
	}
}))

export default useAppStore
