import { Avatar, Card, CardProps, Tag } from "antd"
// import ImgCrop from "antd-img-crop"
import useUserStore from "@/store/userStore"
import useWeather from "@/hooks/weather"
import useAppStore from "@/store/appStore"
import { EditOutlined } from "@ant-design/icons"
import Prompt from "@/components/Modal/Prompt"
import { GetUserInfo, UpdateUserInfo } from "@/api/system"

const WeatherComp = () => {
	const { position } = useAppStore()
	const { weather } = useWeather()

	return weather ? (
		<a href={weather.fxLink} target="__blank" className="flex">
			<div className="flex flex-col items-end justify-between">
				<p className="my-0">
					{position?.city} · {position?.name}
				</p>

				<div className="text-[24px]">
					<i className={"qi-" + weather.icon}></i>
					<span className="ml-2">{weather.temp}°</span>
				</div>
			</div>
		</a>
	) : null
}

function UserCard(props: CardProps) {
	const { userInfo, updateUserInfo } = useUserStore()
	// const changePhoto: UploadProps["onChange"] = data => {
	// 	console.log(data)
	// }

	/**
	 * 暂时使用
	 *
	 * 用户输入链接替换头像
	 */
	const changeUserPhoto = async () => {
		const photo = await Prompt<string>({
			title: "修改头像",
			content: "请输入头像链接"
		})

		if (!photo) return

		await UpdateUserInfo({
			photo
		})

		updateUserInfo({ photo })
	}

	const changeUserName = async () => {
		const name = await Prompt<string>({
			value: userInfo?.name,
			title: "修改昵称",
			content: "请输入昵称"
		})

		if (!name) return

		await UpdateUserInfo({
			name
		})

		updateUserInfo({ name })
	}

	const testaa = () => {
		GetUserInfo()
	}

	return (
		<Card {...props} bodyStyle={{ height: "100%" }}>
			<div className="flex h-full items-center">
				<div className="flex flex-1">
					<div
						className="relative cursor-pointer overflow-hidden rounded-full"
						onClick={changeUserPhoto}
					>
						<Avatar src={userInfo?.photo} size={64} />
						<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-60 text-white opacity-0 transition-opacity hover:opacity-100">
							替换
						</div>
					</div>
					<div className="ml-3 flex flex-col justify-around">
						<h3 className="my-0 cursor-pointer" onClick={changeUserName}>
							{userInfo?.name}
							<EditOutlined className="ml-2 text-theme-color" />
						</h3>
						<Tag color="success" onClick={testaa} className="w-fit">
							{userInfo?.roleName || "暂无"}
						</Tag>
					</div>
				</div>
				<WeatherComp />
			</div>
		</Card>
	)
}

export default UserCard
