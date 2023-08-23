import CarbonLogoGithub from "~icons/carbon/logo-github"
import CarbonInformation from "~icons/carbon/information"
import CarbonSun from "~icons/carbon/sun"
import CarbonMoon from "~icons/carbon/moon"
import useAppStore from "@/store/appStore"
import { memo } from "react"
import siderStyle from "./index.module.scss"

function tools() {
	const { theme, changeTheme } = useAppStore()

	return (
		<div className="mb-3 flex flex-col gap-x-4 gap-y-3 pl-[15px] text-sm leading-[0px]">
			{/* <CarbonNotification className={toolClassName} /> */}
			<div onClick={() => changeTheme()} className={siderStyle["sideItem"]}>
				<div
					className={siderStyle["sideItem--icon"] + " mr-2 group-hover:w-fit"}
				>
					{theme === "light" ? <CarbonSun /> : <CarbonMoon />}
				</div>
				<p className={siderStyle["sideItem--label"]}>
					{theme === "light" ? "浅色" : "深色"}
				</p>
			</div>
			{/* <CarbonOverflowMenuHorizontal className="group-hover:hidden" /> */}
			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				title="Github"
				className={siderStyle["sideItem"] + " no-underline"}
			>
				<div
					className={siderStyle["sideItem--icon"] + " mr-2 group-hover:w-fit"}
				>
					<CarbonLogoGithub />
				</div>
				<p className={siderStyle["sideItem--label"]}>Github</p>
			</a>

			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				title="Github"
				className={siderStyle["sideItem"] + " no-underline"}
			>
				<div
					className={siderStyle["sideItem--icon"] + " mr-2 group-hover:w-fit"}
				>
					<CarbonInformation />
				</div>
				<p className={siderStyle["sideItem--label"]}>关于</p>
			</a>
		</div>
	)
}

export default memo(tools)
