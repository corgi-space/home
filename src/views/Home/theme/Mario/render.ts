import * as PIXI from "pixi.js"
import Brick from "./assets/stone.png"
import Reward from "./assets/frame-5.gif"
import { ICreateSprite, renderTime } from "../utils/renderTime"

const BrickSize = 36
const SideWidth = 50

export class CreateTheme {
	private app: PIXI.Application
	private destroyedList: Function[] = []

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

	/**
	 * 销毁
	 */
	public destroyed() {
		this.destroyedList.forEach(item => item())
		this.app.destroy()
	}

	/**
	 * 初始化主题
	 */
	private loadResource() {
		// PIXI.loadTextures.add("gifImage", "path/to/your/gifImage.gif")
		/**
		 * 渲染时间
		 */
		const clearTimeRender = renderTime(
			this.app,
			this.createBrick.bind(this),
			BrickSize
		)
		this.destroyedList.push(clearTimeRender)
	}

	/**
	 * 生成砖块
	 * @param param0
	 *
	 */
	private createBrick: ICreateSprite = async ({ father, index, container }) => {
		// const texture = await PIXI.Assets.load()
		const brick = PIXI.Sprite.from(index === 2 ? Reward : Brick)

		brick.width = BrickSize
		brick.height = BrickSize

		brick.interactive = true
		brick.cursor = "pointer"
		brick.on("pointertap", async () => {
			if (index !== 2) {
				father.removeChild(brick)
			} else {
				/**
				 * 当分号被点击时，重置时间渲染
				 *
				 * 修改数字标记，在下一秒渲染时重新绘制所有数字
				 */
				container._timeArr = undefined
			}
		})

		return brick
	}
}
