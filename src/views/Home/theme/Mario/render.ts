import * as PIXI from "pixi.js"
import Brick from "./assets/brick.png"
import Reward from "./assets/reward.png"

export class CreateTheme {
	app: PIXI.Application
	isd: Boolean
	constructor(el: string) {
		this.app = new PIXI.Application({
			width: window.innerWidth - 50, // 减去侧边栏
			height: window.innerHeight,
			resizeTo: window,
			backgroundColor: 0x3c9dfb
		})

		document.querySelector(el)!.appendChild(this.app.view as unknown as Node)

		this.loadResource()
	}

	loadResource() {}

	async createBrick() {
		const texture = await PIXI.Assets.load(Brick)
		const brick = PIXI.Sprite.from(texture)

		brick.width = 50
		brick.height = 50

		brick.interactive = true
		brick.cursor = "pointer"

		brick.on("click", async () => {
			this.app.stage.removeChild(brick)
		})

		return brick
	}

	async renderTime(timeMatrix: number[][][]) {
		if (this.isd) {
			console.log("加过了")
		} else {
			this.isd = true
			console.log(timeMatrix)
			const brick = await this.createBrick()
			brick.x = 300
			brick.y = 200
			this.app.stage.addChild(brick)
		}
	}
}
