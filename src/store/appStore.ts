import { create } from "zustand"
import { getStorage, setStorage } from "@/utils/storage"
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

	setStorage({
		key: "position",
		data: position,
		fn: sessionStorage
	})
	useAppStore.setState(() => ({ position: position }))
}

const getPosition = () => {
	let position = getStorage<IPosition>("position", sessionStorage)

	if (!position) {
		loadScript(`http://whois.pconline.com.cn/ipJson.jsp?callback=savePosition`)
		return null
	} else {
		return position
	}
}

const useAppStore = create<State & Action>(set => ({
	theme: getStorage<ITheme>("theme") || "light",
	themeColor: getStorage<string>("themeColor") || ThemeColor,
	position: getPosition(),

	change: (key, data) => {
		setStorage({ key, data })
		set(() => ({ [key]: data }))
	}
}))

export default useAppStore
