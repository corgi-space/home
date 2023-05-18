import createDrawer, { DrawerRef } from "@/components/CreateDrawer/index"
import { useEffect } from "react"

interface IDrawerOptions {
	id?: number
}

export type ISettingDrawerRef = DrawerRef<IDrawerOptions>
const NoticeDetails = createDrawer(({ options }) => {
	useEffect(() => {}, [options])

	return (
		<div>
			<div>
				<h3>这里是一些标题</h3>
				<p>
					<span>发布人：用户名</span>
					<span>发布时间：2023-04-05 14:22</span>
				</p>
			</div>
			<div>这里是正文</div>
		</div>
	)
})

export default NoticeDetails
