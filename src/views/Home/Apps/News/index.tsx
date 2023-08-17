import { Get } from "@/utils/request"
import { useRequest } from "ahooks"
import { useState } from "react"
import { IHotNewItem } from "./type"

const Cachekeys = "app-news-keys"

function index() {
	const [activeKey, changeActiveKey] = useState("")

	const { data, run } = useRequest(
		key => Get<IHotNewItem[]>(`/getHot?key=${key}`),
		{
			manual: true
		}
	)

	const { data: list } = useRequest(
		() =>
			Get<
				{
					key: string
					name: string
				}[]
			>("/getHotKeys"),
		{
			cacheKey: Cachekeys,
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
		<div className="appItem-icon cursor-pointer overflow-hidden  bg-gray-800 bg-opacity-80 p-2 text-slate-300 backdrop-blur-[2px]">
			<div className="flex gap-2">
				{list?.map(item => (
					<div
						key={item.key}
						className={
							"rounded-md bg-opacity-50 p-1 text-xs " +
							(activeKey === item.key ? "bg-gray-400 text-white" : "")
						}
						onMouseOver={() => changeKey(item.key)}
					>
						{item.name}
					</div>
				))}
			</div>
			<div className="h-[calc(100%-24px)] overflow-auto text-xs">
				{data?.map((item, index) => (
					<a
						href={item.url}
						key={item.id}
						className="my-2 block truncate text-left no-underline visited:text-gray-500 hover:underline"
						target="__blank"
					>
						{index + 1}. {item.title}
					</a>
				))}
			</div>
		</div>
	)
}

export default index
