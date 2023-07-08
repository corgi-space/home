import CarbonLogoGithub from "~icons/carbon/logo-github"
import CarbonInformation from "~icons/carbon/information"
import CarbonSun from "~icons/carbon/sun"
import CarbonMoon from "~icons/carbon/moon"
import CarbonNotification from "~icons/carbon/notification"
import CarbonOverflowMenuHorizontal from "~icons/carbon/overflow-menu-horizontal"
import useAppStore from "@/store/appStore"
import { memo } from "react"

const toolClassName =
	"transition-opacity cursor-pointer hover:opacity-100 opacity-50"

function tools() {
	const { theme, changeTheme } = useAppStore()

	return (
		<div className="mb-3 flex w-[60px] flex-wrap gap-x-4 gap-y-3 px-[15px] text-lg leading-[0px]">
			<CarbonNotification className={toolClassName} />
			<div onClick={() => changeTheme()} className={toolClassName}>
				{theme === "light" ? <CarbonSun /> : <CarbonMoon />}
			</div>
			<CarbonOverflowMenuHorizontal className="group-hover:hidden" />
			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				title="Github"
				className={"hidden group-hover:block " + toolClassName}
			>
				<CarbonLogoGithub />
			</a>

			<CarbonInformation className={toolClassName} />
		</div>
	)
}

export default memo(tools)
