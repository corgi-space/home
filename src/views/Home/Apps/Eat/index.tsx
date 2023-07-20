import EatApp from "./app"
import Meta from "./meta"
import useEat from "./useEat"

function index() {
	const [runEat, content] = useEat()

	const openApp = () => {
		EatApp()
	}

	const run = (e: MouseEventHandler<HTMLButtonElement>) => {
		e.stopPropagation()
		runEat()
	}

	return (
		<>
			<div className="appItem-icon" onClick={openApp}>
				<h3>{content}</h3>
				<button onClick={run}>开始</button>
			</div>
			<p className="appItem-title">{Meta["name"]}</p>
		</>
	)
}

export default index
