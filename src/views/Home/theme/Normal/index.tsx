import { ReactNode } from "react"
import TimeBox from "./TimeBox"
import useAppStore from "@/store/appStore"
import { GetBingPhoto } from "@/api/common"
import { useRequest } from "ahooks"
import dayjs from "dayjs"
import { getStorage, setStorage } from "@/utils/storage"

const DefaultPhoto =
	"https://cn.bing.com//th?id=OHR.CordouanLighthouse_ZH-CN6267155218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"

const cacheKey = "bingPhoto"

function index(props: { children: ReactNode }) {
	const { theme } = useAppStore()
	const { data: photoSrc } = useRequest(GetBingPhoto, {
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
	})
	return (
		<div className="full">
			<div className="full fixed left-0 top-0 -z-[1]">
				{theme === "dark" ? (
					<div
						className="full absolute z-[1] backdrop-blur-sm backdrop-brightness-90"
						style={{ transform: "translateZ(0)" }}
					></div>
				) : null}

				<img
					src={photoSrc || DefaultPhoto}
					className="full block object-cover"
				></img>
			</div>
			<div className="container mx-auto box-border flex h-full flex-col py-4 text-center">
				<TimeBox className="mb-4" />
				<div className="flex-1 overflow-auto">{props.children}</div>
			</div>
		</div>
	)
}

export default index
