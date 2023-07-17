import { GetBingPhoto } from "@/api/common"
import { cacheRequest } from "@/utils/storage"
import { useRequest } from "ahooks"
import dayjs from "dayjs"
import { ReactNode } from "react"
import TimeBox from "./TimeBox"

function index(props: { children: ReactNode }) {
	const { data: photoSrc } = useRequest(() =>
		cacheRequest<string>(() => GetBingPhoto().then(res => res.data), {
			key: "bingPhoto",
			storage: sessionStorage,
			expirationTime: dayjs().add(1, "day").hour(8).minute(0).diff(dayjs())
		})
	)

	return (
		<div className="full relative">
			<div className="full absolute left-0 top-0 -z-[1] object-cover">
				<img src={photoSrc} className="full block object-cover"></img>
			</div>
			<div className="container mx-auto box-border h-full py-4 text-center">
				<TimeBox />
				<div className="p-5">{props.children}</div>
			</div>
		</div>
	)
}

export default index
