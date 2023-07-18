import * as PIXI from "pixi.js"
import { addZero } from "@/utils"
import TimeList from "./timeList"

export type ICreateSprite = (op: {
	father: PIXI.Container
	index: number
	container: PIXI.Container & { _timeArr?: string[] }
}) => Promise<PIXI.Sprite>
/**
 * 用来生成时间
 */
export function renderTime(
	app: PIXI.Application,
	renderItem: ICreateSprite,
	BrickSize = 40
) {
	const renderTime = createTimeRenderer(app, renderItem, BrickSize)
	const fn = () => {
		const [timeMatrix, timeArr] = getTimeMatrix()
		renderTime(timeMatrix, timeArr)
	}
	fn()

	const timeRef = setInterval(fn, 900)
	return () => {
		clearInterval(timeRef)
	}
}

/**
 * 创建时间数字的渲染器
 * @param app
 * @param renderItem
 * @param BrickSize
 */
export function createTimeRenderer(
	app: PIXI.Application,
	renderItem: (options: {
		father: PIXI.Container
		index: number
		container: PIXI.Container & { _timeArr?: string[] }
	}) => Promise<PIXI.Sprite>,
	BrickSize = 40
) {
	const timeContainer: PIXI.Container & { _timeArr?: string[] } =
		new PIXI.Container()

	timeContainer.x = app.view.width / 2 - BrickSize * 11
	timeContainer.y = BrickSize

	app.stage.addChild(timeContainer)
	const renderTime = (timeMatrix: number[][][], timeArr: string[]) => {
		/**
		 * 生成单个数字
		 * @param numMatrix 方阵
		 * @param i 下标
		 */
		const renderNum = (numMatrix: number[][], i: number) => {
			/**
			 * 计算当前数字之前的宽度
			 */
			const beforeW = timeMatrix.slice(0, i).reduce((pre, cur) => {
				const res = pre + (cur[0].length + 1) * BrickSize
				return res
			}, 0)

			numMatrix.forEach((row, rowI) => {
				row.forEach(async (item, index) => {
					if (item) {
						const brick = await renderItem({
							father: timeContainer.children[i] as PIXI.Container,
							index: i,
							container: timeContainer
						})
						brick.x = beforeW + index * BrickSize
						brick.y = rowI * BrickSize
						;(timeContainer.children[i] as PIXI.Container).addChild(brick)
					}
				})
			})
		}

		timeMatrix.forEach((numMatrix, i) => {
			if (timeContainer.children[i]) {
				/**
				 * 仅在初始化 或 当前数字发生改变时，重新渲染单个数字
				 */
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

/**
 * 生成时间数字矩阵
 */
export const getTimeMatrix = (): [number[][][], string[]] => {
	const timeList = getTime()
	const { hours, minutes } = timeList
	const numList: string[] = []

	numList.push(...numSplit(hours))
	numList.push(":")
	numList.push(...numSplit(minutes))

	const res: (typeof TimeList)[keyof typeof TimeList][] = numList.map(
		k => TimeList[k as keyof typeof TimeList]
	)

	return [res, numList]
}

const WeekList = ["日", "一", "二", "三", "四", "五", "六"]

export const getTime = () => {
	const date = new Date()

	return {
		year: date.getFullYear(),
		month: addZero(date.getMonth() + 1),
		day: addZero(date.getDate()),
		hours: addZero(date.getHours()),
		minutes: addZero(date.getMinutes()),
		seconds: addZero(date.getSeconds()),
		week: WeekList[date.getDay()]
	}
}

const numSplit = (s: string) => {
	return s.split("")
}
