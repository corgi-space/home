import { Button, message } from "antd"

function Home() {
	const finish = () => {
		message.success("ok")
	}

	return (
		<div>
			<Button type="primary" onClick={finish}>
				这是按钮
			</Button>
		</div>
	)
}

export default Home
