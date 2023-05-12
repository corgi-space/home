import { GetBingPhoto } from "@/api/common"
import { cacheRequest } from "@/utils/storage"
import { useRequest } from "ahooks"

const defaultPhoto =
	"https://cn.bing.com//th?id=OHR.CordouanLighthouse_ZH-CN6267155218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"

const Wallpaper = () => {
	const { data: photoSrc } = useRequest(() =>
		cacheRequest<string>(() => GetBingPhoto().then(res => res.data), {
			key: "bingPhoto",
			storage: sessionStorage
		})
	)

	return (
		<div className="fixed z-[-1] h-[100vh] w-[100vw]">
			<div className="absolute h-full w-full bg-black bg-opacity-[var(--wallpaper-opacity)] backdrop-blur-[var(--wallpaper-blur)]"></div>
			<img
				className="h-full w-full object-cover"
				src={photoSrc || defaultPhoto}
			></img>
		</div>
	)
}

export default Wallpaper
