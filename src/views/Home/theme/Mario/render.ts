import * as PIXI from "pixi.js"
import Brick from "./assets/brick.png"
import Reward from "./assets/reward.png"

const BrickSize = 40
const SideWidth = 50

export class CreateTheme {
	app: PIXI.Application
	isd: Boolean = false
	public renderTime!: (timeMatrix: number[][][], timeArr: string[]) => void
	constructor(el: string) {
		this.app = new PIXI.Application({
			width: window.innerWidth - SideWidth, // 减去侧边栏
			height: window.innerHeight,
			resizeTo: window,
			backgroundColor: 0x3c9dfb
		})

		document.querySelector(el)!.appendChild(this.app.view as unknown as Node)
		this.loadResource()
	}

	loadResource() {
		this.renderTime = createTimeContainer(this.app, this.createBrick.bind(this))
	}

	async createBrick({ father, index, container }) {
		const texture = await PIXI.Assets.load(index === 2 ? Reward : Brick)
		const brick = PIXI.Sprite.from(texture)

		brick.width = BrickSize
		brick.height = BrickSize

		brick.interactive = true
		brick.cursor = "pointer"

		if (index !== 2) {
			brick.on("click", async e => {
				console.log("点击了", e, index)
				father.removeChild(brick)
			})
		}

		return brick
	}
}

function createTimeContainer(
	app: PIXI.Application,
	renderItem: (options: {
		father: PIXI.Container
		index: number
		container: PIXI.Container & { _timeArr?: string[] }
	}) => Promise<PIXI.Sprite>
) {
	const timeContainer: PIXI.Container & { _timeArr?: string[] } =
		new PIXI.Container()

	timeContainer.x = app.view.width / 2 - BrickSize * 12
	timeContainer.y = BrickSize

	app.stage.addChild(timeContainer)
	const renderTime = (timeMatrix: number[][][], timeArr: string[]) => {
		/**
		 * 生成单个数字
		 * @param numMatrix 方阵
		 * @param i 下标
		 */
		const renderNum = (numMatrix: number[][], i: number) => {
			numMatrix.forEach((row, rowI) => {
				row.forEach(async (item, index) => {
					if (item) {
						const brick = await renderItem({
							father: timeContainer.children[i] as PIXI.Container,
							index: i,
							container: timeContainer
						})
						brick.x = i * BrickSize * 4 + index * BrickSize
						brick.y = rowI * BrickSize
						;(timeContainer.children[i] as PIXI.Container).addChild(brick)
					}
				})
			})
		}

		timeMatrix.forEach((numMatrix, i) => {
			if (timeContainer.children[i]) {
				if (
					!timeContainer._timeArr ||
					timeContainer._timeArr[i] !== timeArr[i]
				) {
					// eslint-disable-next-line @typescript-eslint/no-extra-semi
					;(timeContainer.children[i] as PIXI.Container).removeChildren()
					renderNum(numMatrix, i)
				}
			} else {
				timeContainer.addChild(new PIXI.Container())
				renderNum(numMatrix, i)
			}
		})

		timeContainer._timeArr = timeArr
	}

	return renderTime
}
