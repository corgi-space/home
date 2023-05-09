import { Avatar, Card, CardProps } from "antd"
import useUserStore from "@/store/userStore"
import useWeather from "@/hooks/weather"
import useAppStore from "@/store/appStore"

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
	const { userInfo } = useUserStore()

	return (
		<Card {...props} bodyStyle={{ height: "100%" }}>
			<div className="flex h-full items-center">
				<div className="flex flex-1">
					<Avatar src={userInfo?.photo} size={64} />
					<div className="ml-3">
						<h3 className="my-0">{userInfo?.userName}</h3>
						<p className="my-0">某某部门，什么角色</p>
					</div>
				</div>
				<WeatherComp />
			</div>
		</Card>
	)
}

export default UserCard
