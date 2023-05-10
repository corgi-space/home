import { Col, Row } from "antd"
import UserCard from "./components/UserCard"
import TaskCard from "./components/TaskCard"
import Tools from "./components/Tools"
import WorkCard from "./components/WorkCard"
import MessageCard from "./components/MessageCard"

function Home() {
	return (
		<Row gutter={12} className="h-full">
			<Col span={12}>
				<div className="row-start-auto flex h-full flex-col gap-3">
					<UserCard
						bordered={false}
						className="glass h-[120px] cursor-auto"
						hoverable
					/>
					<WorkCard
						bordered={false}
						className="glass flex-[280px] cursor-auto"
						hoverable
					/>
					<MessageCard
						bordered={false}
						className="glass flex-[240px] cursor-auto"
						hoverable
					/>
				</div>
			</Col>
			<Col span={12} flex={1} className="flex-row">
				<div className="row-start-auto flex h-full flex-col gap-3">
					<TaskCard
						bordered={false}
						className="glass flex-1 cursor-auto"
						hoverable
					/>
					<Tools className="h-[120px]" />
				</div>
			</Col>
		</Row>
	)
}

export default Home
