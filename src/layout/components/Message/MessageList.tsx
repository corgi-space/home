import { List, Avatar } from "antd"

const data = [
	{
		title: "Ant Design Title 1"
	},
	{
		title: "Ant Design Title 2"
	},
	{
		title: "Ant Design Title 3"
	},
	{
		title: "Ant Design Title 4"
	}
]

function MessageList() {
	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			renderItem={(item, index) => (
				<List.Item className="cursor-pointer !px-2 hover:bg-gray-300">
					<List.Item.Meta
						avatar={
							<Avatar
								src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
							/>
						}
						title={<a href="https://ant.design">{item.title}</a>}
						description="Ant Design, a design language for background applications, is refined by Ant UED Team"
					/>
				</List.Item>
			)}
		/>
	)
}

export default MessageList
