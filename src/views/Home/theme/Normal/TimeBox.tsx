import { memo, useEffect, useState } from "react"
import { getTime } from "../utils/renderTime"

function TimeBox() {
	const [timeList, setTimeList] = useState(getTime())

	useEffect(() => {
		let timer = setInterval(() => {
			setTimeList(getTime())
		}, 900)

		return () => {
			clearInterval(timer)
		}
	})

	return (
		<time className="mx-auto my-0 inline-block text-center text-[60px] text-[#f1f1f1]">
			{timeList[0] + ":" + timeList[1]}
		</time>
	)
}

export default memo(TimeBox)
