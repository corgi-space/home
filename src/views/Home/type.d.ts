import { SizeConfig } from "./Apps"
import {} from "react"

interface IAppMeta {
	readonly app: string
	readonly name: string
	readonly description: string
	readonly size: IAppSize
	readonly index: FC
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
