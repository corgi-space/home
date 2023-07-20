import { useLocation, useNavigate } from "react-router-dom"
import CarbonShoppingCart from "~icons/carbon/shopping-cart"
import CarbonHome from "~icons/carbon/home"
import CarbonChartRadial from "~icons/carbon/chart-radial"
import CarbonDataCategorical from "~icons/carbon/data-categorical"

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
		<div className="my-6 flex flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden pl-[15px]">
			{HeaderItems.map(item => (
				<div
					key={item.key}
					onClick={() => clickItem(item.key)}
					className={
						(localtion.pathname === item.key
							? "text-primary opacity-100"
							: "opacity-50") +
						" mb-2 box-border flex h-10 flex-shrink-0 origin-left cursor-pointer items-center overflow-hidden whitespace-nowrap transition-transform hover:scale-[1.1] hover:opacity-100"
					}
				>
					<div className="mr-3 shrink-0 text-lg leading-[0px] transition-all">
						{item.icon}
					</div>
					<p className="my-0 leading-[0px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						{item.label}
					</p>
				</div>
			))}
		</div>
	)
}

export default navList
