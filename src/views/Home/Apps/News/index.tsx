import { Get } from "@/utils/request"
import { useRequest } from "ahooks"
import { useEffect, useState } from "react"
import { IHotNewItem } from "./type"

const Cachekeys = "app-news-keys"

function index() {
	const [activeKey, changeActiveKey] = useState("")
	const [newsMap, setNewsMap] = useState<Record<string, IHotNewItem[]>>({})

	const getNewsList = async key => {
		if (!newsMap[key]) {
			const list = await Get<IHotNewItem[]>(`/getHot?key=${key}`)
			newsMap[key] = list

			setNewsMap({
				...newsMap,
				[key]: list
			})
		}
	}

	const { data: list } = useRequest(
		() =>
			Get<
				{
					key: string
					name: string
				}[]
			>("/getHotKeys"),
		{
			cacheKey: Cachekeys
		}
	)

	useEffect(() => {
		if (list && list.length) {
			changeKey(list[0].key)
		}
	}, [list])

	const changeKey = (key: string) => {
		changeActiveKey(key)
		getNewsList(key)
	}

	return (
		<div className="appItem-icon cursor-pointer overflow-hidden  bg-[#bbb3ac] bg-opacity-80 p-2 text-slate-700 backdrop-blur-[4px] dark:bg-[#363432cc] dark:text-slate-300">
			<div className="flex gap-2">
				{list?.map(item => (
					<div
						key={item.key}
						className={
							"rounded-md bg-opacity-50 p-1 text-xs " +
							(activeKey === item.key ? "bg-[#86796e] text-white" : "")
						}
						onMouseOver={() => changeKey(item.key)}
					>
						{item.name}
					</div>
				))}
			</div>
			<div className="h-[calc(100%-24px)] overflow-auto text-xs">
				{newsMap[activeKey]?.map((item, index) => (
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
