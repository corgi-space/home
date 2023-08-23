import useUserStore from "@/store/userStore"
import { Tag } from "antd"
import CarbonCaretRight from "~icons/carbon/caret-right"
import { useNavigate } from "react-router-dom"
import { memo } from "react"

function userBox() {
	const navigate = useNavigate()

	const { userInfo } = useUserStore()

	const handleClick = () => {
		if (userInfo) {
			navigate("/userInfo")
		} else {
			navigate("/login")
		}
	}

	return (
		<div className="relative cursor-pointer select-none" onClick={handleClick}>
			<img
				src={userInfo?.photo || ""}
				className="pointer-events-none absolute left-[5px] top-1 z-10 h-10 w-10 rounded-full transition-all group-hover:h-12 group-hover:w-12 group-hover:translate-x-1"
			/>
			<div className="flex h-12 items-center justify-between rounded-xl bg-white py-1 pl-2 pr-1 opacity-0 shadow shadow-sky-800/20 transition-opacity hover:shadow-inner group-hover:opacity-100 dark:bg-gray-700">
				{userInfo && userInfo.memberId ? (
					<>
						<div className="flex h-full flex-col justify-around whitespace-nowrap pl-14">
							<p className="my-0 w-[70px] truncate text-xs">{userInfo?.name}</p>
							<Tag color="success" className="w-fit leading-4">
								{userInfo?.roleName}
							</Tag>
						</div>
						<CarbonCaretRight className="text-sm" />
					</>
				) : (
					<p className="pl-14">点击登录</p>
				)}
			</div>
		</div>
	)
}

export default memo(userBox)
