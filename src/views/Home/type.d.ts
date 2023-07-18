import { SizeConfig } from "./appList"

interface IAppMeta {
	name: string
	description: string
	sizes: IAppSize
}

type IAppSize = keyof typeof SizeConfig | [number, number]

type IAppProps = {
	size: IAppSize
}
