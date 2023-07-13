import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import TimeList from "./timeList"
import { addZero } from "@/utils"

export const useTimeMatrix = (): [number[][][], string[]] => {
	const timeArr = useTimeArr()

	const numSplit = (s: string) => {
		return s.split("")
	}

	return useMemo(() => {
		const [num1, num2] = timeArr
		const numList: string[] = []

		numList.push(...numSplit(num1))
		numList.push(":")
		numList.push(...numSplit(num2))

		const res: (typeof TimeList)[keyof typeof TimeList][] = numList.map(
			k => TimeList[k as keyof typeof TimeList]
		)

		return [res, numList]
	}, [timeArr])
}

export const useTimeArr = () => {
	const getTime = () => {
		const date = new Date()
		const hour = date.getHours()
		const minute = date.getMinutes()

		return [addZero(hour), addZero(minute)]
	}

	const [state, setState] = useState<string[]>(getTime())
	const timerRef = useRef<number | null>(null)

	const clear = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
	}, [])

	timerRef.current = setInterval(() => {
		setState(getTime())
	}, 900)

	useEffect(() => {
		return clear
	}, [])

	return state
}
