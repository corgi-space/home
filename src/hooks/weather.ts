import { WeatherKey } from "@/config"
import useAppStore from "@/store/appStore"
import { getStorage, setStorage } from "@/utils/storage"
import axios from "axios"
import { useEffect, useState } from "react"
import { IPosition } from "../types/index"

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

// type Indices = {
// 	name: string
// 	category: string
// 	text: string
// 	type: string
// 	level: string
// }[]

/**
 * 获取天气信息
 * @param cityId
 */
const getWeather = async (position: IPosition): Promise<IWeather> => {
	let weather = getStorage<IWeather>("weather", sessionStorage)

	if (weather) {
		return weather
	}
	weather = await axios
		.get(
			`https://devapi.qweather.com/v7/weather/now?key=${WeatherKey}&location=${position.cityId}`
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

	setStorage({
		key: "weather",
		data: weather,
		fn: sessionStorage,
		expirationTime: 1 * 60 * 60 * 1000 // 过期时间 1个小时
	})

	return weather as IWeather
}

/**
 * 获取天气指数
 * @param cityId
 */
// const getIndices = async (cityId: number): Promise<Indices> => {
// 	let indices = getStorage<Indices>("indices", sessionStorage)

// 	if (indices) {
// 		return indices
// 	}
// 	indices = await axios
// 		.get(
// 			`https://devapi.qweather.com/v7/indices/1d?key=${WeatherKey}&location=${cityId}&type=1,3`
// 		)
// 		.then(res => res.data.daily)

// 	setStorage({
// 		key: "indices",
// 		data: indices,
// 		fn: sessionStorage,
// 		expirationTime: 12 * 60 * 60 * 1000 // 过期时间 12个小时
// 	})

// 	return indices as Indices
// }

const useWeather = () => {
	const { position } = useAppStore()
	const [weather, setWeather] = useState<IWeather>()
	// const [indices, setIndices] = useState<Indices>()

	const init = async () => {
		if (!position) return

		setWeather(await getWeather(position))

		// setIndices(await getIndices(position.cityId))
	}

	useEffect(() => {
		init()
	}, [position])

	return { weather }
}

export default useWeather
