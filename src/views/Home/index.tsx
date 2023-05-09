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
					<UserCard className="h-[120px]" hoverable />
					<WorkCard className="flex-[280px]" hoverable />
					<MessageCard className="flex-[240px]" hoverable />
				</div>
			</Col>
			<Col span={12} flex={1} className="flex-row">
				<div className="row-start-auto flex h-full flex-col gap-3">
					<TaskCard className="flex-1" hoverable />
					<Tools className="h-[120px]" />
				</div>
			</Col>
		</Row>
	)
}

export default Home
