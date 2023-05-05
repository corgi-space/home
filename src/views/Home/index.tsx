import { Col, Row } from "antd"
import UserCard from "./components/UserCard"
import TaskCard from "./components/TaskCard"
import Tools from "./components/Tools"
import WorkCard from "./components/WorkCard"
import MessageCard from "./components/MessageCard"

function Home() {
	return (
		<Row gutter={16} className="h-full">
			<Col span={12}>
				<div className="row-start-auto flex h-full flex-col gap-4">
					<UserCard className="h-[140px]" hoverable />
					<WorkCard className="h-[280px]" hoverable />
					<MessageCard className="flex-1" hoverable />
				</div>
			</Col>
			<Col span={12} flex={1} className="flex-row">
				<div className="row-start-auto flex h-full flex-col gap-4">
					<TaskCard className="flex-1" hoverable />
					<Tools className="h-[120px]" />
				</div>
			</Col>
		</Row>
	)
}

export default Home
