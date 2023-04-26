import { useAppDispatch, useAppSelector } from "@/store"
import { changeThemeColor } from "@/store/modules/appStore"
import { Button, Input } from "antd"
import { useMemo, useState } from "react"

const test = (num: number) => {
	return "结果是" + num
}

function Home() {
	const { themeColor } = useAppSelector(state => state.appStore)
	const dispatch = useAppDispatch()

	const [num, setNum] = useState(2)
	const a = useMemo(() => test(num), [num])

	return (
		<div>
			<Button type="primary" onClick={() => setNum(num + 1)}>
				这是按钮
			</Button>

			<Input
				value={themeColor}
				onChange={e => dispatch(changeThemeColor(e.target.value))}
			></Input>

			{/* <Button type="primary" onClick={() => a(num)}>
				Get
			</Button> */}
			<div className="w-">{a}</div>
		</div>
	)
}

export default Home
