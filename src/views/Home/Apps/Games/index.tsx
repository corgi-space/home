import { useOpenApp } from "../../hooks/CreateAppModal"

function index() {
	const open = useOpenApp(() => import("./app"))

	return (
		<div className="appItem-icon cursor-pointer" onClick={open}>
			<img
				src="https://d00.paixin.com/thumbs/1734074/42284527/staff_1024.jpg"
				alt=""
				className="full"
			/>
		</div>
	)
}

export default index
