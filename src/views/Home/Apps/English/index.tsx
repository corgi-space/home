import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { IDayEnglish } from "./type"
import LoadingApp from "../../components/LoadingApp"
import dayjs from "dayjs"

const cacheKey = "dayEnglish"

function index() {
	const { data } = useRequest(
		() => Get<IDayEnglish>({ url: "/getDayEnglish" }),
		{
			cacheKey,
			staleTime: dayjs().add(1, "day").hour(8).minute(0).diff(dayjs()), // 缓存到明天早上八点
			setCache: data => localStorage.setItem(cacheKey, JSON.stringify(data)),
			getCache: () => JSON.parse(localStorage.getItem(cacheKey) || "{}")
		}
	)

	if (!data) {
		return <LoadingApp />
	}

	return (
		<div className="appItem-icon relative bg-slate-800 bg-opacity-60 p-4">
			<img
				src={data.picture2}
				className="full absolute left-0 top-0 z-[-1] object-cover"
			></img>
			<div className="full flex select-text flex-col justify-evenly text-left text-white">
				<p>{data.content}</p>
				<p>{data.note}</p>
			</div>
		</div>
	)
}

export default index
