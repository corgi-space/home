import { start } from "./game"
import { Button } from "antd"

// const listPath =
// 	"https://raw.githubusercontent.com/gamedilong/anes-repository/master/list.json"

// async function start() {
// 	const jsnes = await import("http://localhost:8080/jsnes.js")
// 	console.log(jsnes)
// }

const HexagonalMesh1 = () => {
	return (
		<>
			<Button
				// onClick={() =>
				// 	start("game", "http://localhost:3000/assets/games/彩虹岛.nes")
				// }
				onClick={() => start("game", "/rrr.nes")}
			>
				开始游戏
			</Button>
			<canvas
				id="game"
				width="256"
				height="240"
				style={{ width: "512px", height: "480px" }}
			></canvas>
		</>
	)
}

export default HexagonalMesh1
