import { WeatherKey } from "@/config"
import useAppStore from "@/store/appStore"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import axios from "axios"
import { useEffect, useState } from "react"

type IWeather = {
	fxLink: string // 跳转地址
	obsTime: string // 更新时间
	temp: string // 温度
	icon: string
	text: string
	windDir: string // 风向
	windScale: string // 风力
	humidity: string // 湿度
	precip: string // 降水量
}

type Indices = {
	name: string
	category: string
	text: string
	type: string
}[]

/**
 * 获取天气信息
 * @param cityId
 */
const getWeather = async (cityId: number): Promise<IWeather> => {
	let weather = getLocalStorage<IWeather>("weather")

	if (weather) {
		return weather
	}
	weather = await axios
		.get(
			`https://devapi.qweather.com/v7/weather/now?key=${WeatherKey}&location=${cityId}`
		)
		.then(res => {
			const data = res.data
			const now = data.now
			return {
				fxLink: data.fxLink, // 跳转地址
				obsTime: now.obsTime, // 更新时间
				temp: now.temp, // 温度
				icon: now.icon,
				text: now.text,
				windDir: now.windDir, // 风向
				windScale: now.windScale, // 风力
				humidity: now.humidity, // 湿度
				precip: now.precip // 降水量
			}
		})

	setLocalStorage("weather", weather, 1 * 60 * 60 * 1000)

	return weather as IWeather
}

/**
 * 获取天气指数
 * @param cityId
 */
const getIndices = async (cityId: number): Promise<Indices> => {
	let indices = getLocalStorage<Indices>("indices")

	if (indices) {
		return indices
	}
	indices = await axios
		.get(
			`https://devapi.qweather.com/v7/indices/1d?key=${WeatherKey}&location=${cityId}&type=1,2,3,5`
		)
		.then(res => res.data.daily)

	setLocalStorage("indices", indices, 24 * 60 * 60 * 1000)

	return indices as Indices
}

const useWeather = () => {
	const { position } = useAppStore()
	const [weather, setWeather] = useState<IWeather>()
	const [indices, setIndices] = useState<Indices>()

	const init = async () => {
		if (!position) return

		setWeather(await getWeather(position.cityId))

		setIndices(await getIndices(position.cityId))
	}

	useEffect(() => {
		init()
	}, [position])

	return { weather, indices }
}

export default useWeather