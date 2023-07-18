import { memo, useEffect, useState } from "react"
import { getTime } from "../utils/renderTime"

function TimeBox(props: { className?: string }) {
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
		<div
			className={
				props.className +
				" mx-auto inline-block text-center text-[#f1f1f1] drop-shadow-lg"
			}
			// style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,.3))" }}
		>
			<h1 className="my-0 text-[60px]">
				{timeList["hours"] + ":" + timeList["minutes"]}
			</h1>
			<p className="my-0 flex justify-between">
				<span>
					{timeList["year"] + "-" + timeList["month"] + "-" + timeList["day"]}
				</span>
				<span>周{timeList["week"]}</span>
			</p>
		</div>
	)
}

export default memo(TimeBox)
