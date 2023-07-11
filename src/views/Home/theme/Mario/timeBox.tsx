import { memo } from "react"
import { useTimeMatrix } from "../../hooks/useTimeArr"

const TimeNumber = memo(({ val }: { val: number[][] }) => {
	return (
		<div className="grid w-[100px] grid-cols-3 gap-2">
			{val.map(item =>
				item.map((v, i) => (
					<div
						key={i}
						className={v ? "block h-5 w-5 bg-sky-300" : "opacity-0"}
					></div>
				))
			)}
		</div>
	)
})

TimeNumber.displayName = "TimeNumber"

function timeBox() {
	const timeArr = useTimeMatrix()

	return (
		<div className="flex gap-5">
			{timeArr && timeArr.map((item, i) => <TimeNumber val={item} key={i} />)}
		</div>
	)
}

export default timeBox
