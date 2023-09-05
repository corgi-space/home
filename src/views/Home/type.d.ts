import { SizeConfig } from "./Apps"

interface IAppMeta {
	name: string
	description: string
	size: IAppSize
}

type IAppSize = keyof typeof SizeConfig | [number, number]

type IAppProps = {
	size: IAppSize
}

type IAppBaseItem = {
	id: number
	app: string
}

type IAppIcon = IAppBaseItem & IAppMeta
