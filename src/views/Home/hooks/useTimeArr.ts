import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import TimeList from "./timeList"
import { addZero } from "@/utils"

export const useTimeMatrix = () => {
	const timeArr = useTimeArr()

	const numSplit = (s: string) => {
		return s.split("")
	}

	return useMemo(() => {
		if (!timeArr.length) return
		const [num1, num2] = timeArr
		const res: (typeof TimeList)[keyof typeof TimeList][] = []

		res.push(...numSplit(num1).map(k => TimeList[k as keyof typeof TimeList]))
		res.push(TimeList[":"])
		res.push(...numSplit(num2).map(k => TimeList[k as keyof typeof TimeList]))
		// res.push(TimeList[":"])
		// res.push(...numSplit(num3).map(k => TimeList[k as keyof typeof TimeList]))

		return res
	}, [timeArr])
}

export const useTimeArr = () => {
	const [state, setState] = useState<string[]>([])
	const timerRef = useRef<number | null>(null)

	const action = () => {
		const date = new Date()
		const hour = date.getHours()
		const minute = date.getMinutes()

		setState([addZero(hour), addZero(minute), addZero(date.getSeconds())])
	}

	const clear = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
	}, [])

	useEffect(() => {
		action()

		timerRef.current = setInterval(action, 900)

		return clear
	}, [])

	return state
}
