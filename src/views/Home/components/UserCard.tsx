import { Avatar, Card, CardProps, Tag, Upload, UploadProps } from "antd"
import ImgCrop from "antd-img-crop"
import useUserStore from "@/store/userStore"
import useWeather from "@/hooks/weather"
import useAppStore from "@/store/appStore"
import { EditOutlined } from "@ant-design/icons"
import Prompt from "@/components/Modal/Prompt"
import { GetUserInfo } from "@/api/system"

const WeatherComp = () => {
	const { position } = useAppStore()
	const { weather } = useWeather()
	const adm1 = position?.region || position?.city

	return weather ? (
		<a href={weather.fxLink} target="__blank" className="flex">
			<div className="flex flex-col items-end justify-between">
				<p className="my-0">{adm1}</p>

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
	const changePhoto: UploadProps["onChange"] = data => {
		console.log(data)
	}

	const changeUserName = async () => {
		const newName = await Prompt<string>({
			value: userInfo?.name
		})

		if (!newName) return

		console.log(newName)

		updateUserInfo({
			name: newName
		})
	}

	const testaa = () => {
		GetUserInfo()
	}

	return (
		<Card {...props} bodyStyle={{ height: "100%" }}>
			<div className="flex h-full items-center">
				<div className="flex flex-1">
					<ImgCrop cropShape="round">
						<Upload
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							onChange={changePhoto}
							showUploadList={false}
						>
							<div className="relative cursor-pointer overflow-hidden rounded-full">
								<Avatar src={userInfo?.photo} size={64} />
								<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-60 text-white opacity-0 transition-opacity hover:opacity-100">
									替换
								</div>
							</div>
						</Upload>
					</ImgCrop>
					<div className="ml-3 flex flex-col justify-around">
						<h3 className="my-0 cursor-pointer" onClick={changeUserName}>
							{userInfo?.name}
							<EditOutlined className="ml-2 text-theme-color" />
						</h3>
						<Tag color="success" onClick={testaa}>
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
