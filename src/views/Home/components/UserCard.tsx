import { Avatar, Card, CardProps } from "antd"
import useUserStore from "@/store/userStore"
import useWeather from "@/hooks/weather"

function UserCard(props: CardProps) {
	const { userInfo } = useUserStore()
	const { weather, indices } = useWeather()
	console.log({ weather, indices })
	return (
		<Card {...props} bodyStyle={{ height: "100%" }}>
			<div className="flex h-full items-center">
				<div className="flex">
					<Avatar src={userInfo?.photo} size={64} />
					<div className="ml-2">
						<h3 className="my-0">{userInfo?.userName}</h3>
						<p className="my-0">某某部门，什么角色</p>
					</div>
				</div>
				{weather ? (
					<div className="flex flex-1 justify-end">
						<i className={"text-2xl" + " qi-" + weather.icon}></i>
						<span>{weather.text}</span>
						<span>温度：{weather.temp}°</span>
						<span>风力：{weather.windScale}级</span>
						<span>湿度：{weather.humidity}%</span>
					</div>
				) : null}
			</div>
		</Card>
	)
}

export default UserCard
