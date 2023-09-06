import Eat from "./Eat/meta"
import English from "./English/meta"
import Games from "./Games/meta"
import News from "./News/meta"

export const AppMetas = [Eat, English, Games, News]

// const metaModules = import.meta.glob("./*/meta.ts")

// export const AppMetas: Record<string, IAppMeta> = {}
// export const Apps: Record<
// 	string,
// 	{
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		content: React.LazyExoticComponent<React.ComponentType<any>>
// 		name: string
// 	}
// > = {}

// for (const path in metaModules) {
// 	metaModules[path]().then(async mod => {
// 		const match = path.match(/\/(\w+)\//)
// 		if (!match) {
// 			console.error("未找到匹配项", path)
// 			return
// 		}
// 		const key = match[1]
// 		const meta = (mod as { default: IAppMeta }).default
// 		AppMetas[key] = meta
// 	})
// }

/**
 * 预设AppSize
 */
export const SizeConfig = {
	small: [1, 1],
	normal: [2, 2],
	big: [4, 2]
} as const
