import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { IDayEnglish } from "./type"
import LoadingApp from "../../components/LoadingApp"
import dayjs from "dayjs"
import { getStorage, setStorage } from "@/utils/storage"

const cacheKey = "dayEnglish"

function index() {
	const { data } = useRequest(
		() => Get<IDayEnglish>({ url: "/getDayEnglish" }),
		{
			cacheKey,
			staleTime: -1,
			setCache: data =>
				setStorage({
					key: cacheKey,
					data,
					expirationTime: dayjs().add(1, "d").hour(8).minute(0).diff(dayjs()),
					fn: localStorage
				}),
			getCache: () => getStorage(cacheKey)
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
