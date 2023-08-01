import { CaretRightOutlined } from "@ant-design/icons"
import { createAppModal } from "../../hooks/CreateAppModal"
import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { List, Layout } from "antd"
import { useState } from "react"

const { Sider, Content } = Layout

export const App = () => {
	const [collapsed, setCollapsed] = useState(false)
	const { data } = useRequest(() =>
		Get<string[]>("/getGameList").then(res => {
			return res.map(item => item.slice(0, item.lastIndexOf(".")))
		})
	)
	return (
		<Layout className="h-[400px] bg-black text-white">
			<Sider
				collapsible
				collapsed={collapsed}
				trigger={null}
				className="h-full w-[200px]"
			>
				<List
					bordered
					dataSource={data}
					renderItem={item => (
						<List.Item className="cursor-pointer">{item}</List.Item>
					)}
					className="h-full overflow-y-auto rounded-bl-none rounded-tl-none bg-gray-200"
				/>
			</Sider>
			<Content>123</Content>
		</Layout>
	)
}

export default createAppModal(App, {
	toolTheme: "light"
})
