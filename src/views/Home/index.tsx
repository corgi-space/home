import Theme from "./theme"
import "./style/index.scss"

function Home() {
	const list = new Array(30).fill("哈")
	return (
		<Theme>
			<div className="grid-container w-full">
				{list.map((item, index) => (
					<div key={index} className="full bg-white">
						{item + index}
					</div>
				))}
			</div>
		</Theme>
	)
}

export default Home
