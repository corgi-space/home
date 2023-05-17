import { Card, CardProps } from "antd"

function TaskCard(props: CardProps) {
	return (
		<Card {...props} title="任务模块">
			<div>进行中</div>
			<div>今日任务</div>
			<div>长期任务</div>
			<div></div>
		</Card>
	)
}

export default TaskCard
