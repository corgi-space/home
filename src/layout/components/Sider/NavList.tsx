import { useLocation, useNavigate } from "react-router-dom"
import CarbonShoppingCart from "~icons/carbon/shopping-cart"
import CarbonHome from "~icons/carbon/home"
import CarbonChartRadial from "~icons/carbon/chart-radial"
import CarbonDataCategorical from "~icons/carbon/data-categorical"
import siderStyle from "./index.module.scss"

const HeaderItems = [
	{ icon: <CarbonHome />, key: "/", label: "首页" },
	{ icon: <CarbonChartRadial />, key: "/devOps", label: "运维" },
	{ icon: <CarbonShoppingCart />, key: "/mall", label: "商城管理" },
	{ icon: <CarbonDataCategorical />, key: "/test", label: "测试服" }
]

function navList() {
	const navigate = useNavigate()
	const localtion = useLocation()
	const clickItem = (key: string) => {
		navigate(key)
	}
	// h-[calc(100%-80px-160px)]
	return (
		<div className="my-6 flex flex-1 flex-col justify-center gap-y-2 overflow-y-auto overflow-x-hidden pl-[15px]">
			{HeaderItems.map(item => (
				<div
					key={item.key}
					onClick={() => clickItem(item.key)}
					className={
						siderStyle.sideItem +
						(localtion.pathname === item.key ? " text-primary opacity-100" : "")
					}
				>
					<div
						className={
							siderStyle["sideItem--icon"] + " text-[18px]  group-hover:w-fit"
						}
					>
						{item.icon}
					</div>
					<p className={siderStyle["sideItem--label"]}>{item.label}</p>
				</div>
			))}
		</div>
	)
}

export default navList
