import { IAppSize } from "./type"

export const SizeConfig = {
	small: [1, 1],
	normal: [2, 2],
	big: [4, 2]
} as const

export interface IAppIcon {
	id: number
	size: IAppSize
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	app: string
}

export const defaultList: IAppIcon[] = [
	{
		id: 1,
		size: "normal",
		app: "Eat"
	},
	{
		id: 2,
		size: "small",
		app: "Games"
	},
	{
		id: 3,
		size: "normal",
		app: "English"
	},
	{
		id: 4,
		size: "normal",
		app: "English"
	},
	{
		id: 5,
		size: "normal",
		app: "English"
	}
]
