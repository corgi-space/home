import { Button } from "antd"
import useUserStore from "@/store/userStore"

function index() {
	const { clear } = useUserStore()

	return (
		<div>
			<Button onClick={clear}>退出登录</Button>
		</div>
	)
}

export default index
