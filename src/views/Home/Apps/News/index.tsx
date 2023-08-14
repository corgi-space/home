import { Get } from "@/utils/request"
import { useRequest } from "ahooks"
import { useState } from "react"

function index() {
	const [activeKey, changeActiveKey] = useState("")

	const { data, run } = useRequest(key => Get(`/getHot?key=${key}`), {
		manual: true
	})

	const { data: list } = useRequest(
		() =>
			Get<
				{
					key: string
					name: string
				}[]
			>("/getHotKeys"),
		{
			onSuccess(data) {
				changeKey(data[0].key)
			}
		}
	)

	const changeKey = (key: string) => {
		changeActiveKey(key)
		run(key)
	}

	return (
		<div className="appItem-icon cursor-pointer bg-slate-400 bg-opacity-30 p-2">
			<div className="flex gap-2">
				{list?.map(item => (
					<div
						key={item.key}
						className={
							"rounded bg-opacity-50 p-1 text-xs text-slate-500 " +
							(activeKey === item.key ? "bg-gray-500 text-slate-100" : "")
						}
						onMouseOver={() => changeKey(item.key)}
					>
						{item.name}
					</div>
				))}
			</div>
			<div>{}</div>
		</div>
	)
}

export default index
