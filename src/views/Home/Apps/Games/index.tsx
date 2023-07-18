import Meta from "./meta"

function index() {
	const openApp = () => {}

	return (
		<>
			<div className="appItem-icon cursor-pointer" onClick={openApp}>
				<img
					src="https://d00.paixin.com/thumbs/1734074/42284527/staff_1024.jpg"
					alt=""
					className="full"
				/>
			</div>
			<p className="appItem-title">{Meta["name"]}</p>
		</>
	)
}

export default index
