import { SizeConfig } from "./appList"

interface IAppMeta {
	name: string
	description: string
	sizes: IAppSize[]
}

type IAppSize = keyof typeof SizeConfig

type IAppProps = {
	size: IAppSize
}
