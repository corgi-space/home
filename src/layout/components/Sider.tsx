import { AppName } from "@/config"
import useUserStore from "@/store/userStore"
import {
	HomeOutlined,
	CloudServerOutlined,
	MacCommandOutlined
} from "@ant-design/icons"
import { Avatar, Tag } from "antd"
import { useNavigate } from "react-router-dom"

const HeaderItems = [
	{ icon: <HomeOutlined size={48} />, key: "/", label: "首页" },
	{ icon: <CloudServerOutlined size={48} />, key: "devOps", label: "运维" },
	{ icon: <MacCommandOutlined size={48} />, key: "mall", label: "商城" }
]

function Sider() {
	const navigate = useNavigate()
	const { userInfo } = useUserStore()

	const clickItem = key => {
		navigate(key)
	}

	return (
		<div className="group fixed left-0 top-0 z-10 box-border h-full w-[var(--sider-initWidth)] overflow-hidden bg-slate-50 shadow transition-all hover:w-[200px] hover:px-3">
			<div className="mt-4 box-border flex h-[40px] items-center overflow-hidden whitespace-nowrap px-2">
				<img
					src="/logo.png"
					className="mr-3 w-8 shrink-0 transition-all group-hover:w-12"
				/>
				<p className="my-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					{AppName}
				</p>
			</div>

			<div className="mt-6 h-[calc(100%-80px-100px)]">
				{HeaderItems.map(item => (
					<div
						key={item.key}
						onClick={() => clickItem(item.key)}
						className="mb-2 box-border flex h-10 cursor-pointer items-center overflow-hidden whitespace-nowrap px-[14px]"
					>
						<div className="mr-3 shrink-0 text-xl text-orange-400 transition-all">
							{item.icon}
						</div>
						<p className="my-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
							{item.label}
						</p>
					</div>
				))}
			</div>

			<div className="">
				<div className="flex rounded-xl border border-solid border-sky-600 bg-white px-2 py-1">
					<img src={userInfo?.photo} className="mr-2 h-12 w-12 rounded-full" />
					<div className="flex flex-col justify-evenly">
						<p className="text-sm">{userInfo?.name}</p>
						<Tag color="success" className="w-fit">
							{userInfo?.roleName}
						</Tag>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sider
