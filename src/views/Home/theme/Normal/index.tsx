import { ReactNode } from "react"
import TimeBox from "./TimeBox"
import useAppStore from "@/store/appStore"

const DefaultPhoto =
	"https://cn.bing.com//th?id=OHR.CordouanLighthouse_ZH-CN6267155218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"

function index(props: { children: ReactNode }) {
	const { theme } = useAppStore()
	// const { data: photoSrc } = useRequest(() =>
	// 	cacheRequest<string>(() => GetBingPhoto().then(res => res.data), {
	// 		key: "bingPhoto",
	// 		storage: sessionStorage,
	// 		expirationTime: dayjs().add(1, "day").hour(8).minute(0).diff(dayjs())
	// 	})
	// )

	return (
		<div className="full">
			<div className="full fixed left-0 top-0 -z-[1]">
				{theme === "dark" ? (
					<div
						className="full absolute z-[1] backdrop-blur-sm backdrop-brightness-90"
						style={{ transform: "translateZ(0)" }}
					></div>
				) : null}

				<img src={DefaultPhoto} className="full block object-cover"></img>
			</div>
			<div className="container mx-auto box-border flex h-full flex-col py-4 text-center">
				<TimeBox className="mb-4" />
				<div className="flex-1">{props.children}</div>
			</div>
		</div>
	)
}

export default index
