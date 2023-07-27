import { useEffect } from "react"
import { start } from "./game"

const listPath =
	"https://raw.githubusercontent.com/gamedilong/anes-repository/master/list.json"

// async function start() {
// 	const jsnes = await import("http://localhost:8080/jsnes.js")
// 	console.log(jsnes)
// }

const HexagonalMesh1 = () => {
	useEffect(() => {
		start("game", "http://localhost:8080/superM.nes")
	}, [])

	return (
		<>
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
