import { IAppProps } from "../../type"
import Meta from "./meta"

function index({ size }: IAppProps) {
	return (
		<>
			<div className="appItem-icon">
				<h3>今天吃什么</h3>
				<button>开始</button>
			</div>
			<p className="appItem-title">{Meta["name"]}</p>
		</>
	)
}

export default index
