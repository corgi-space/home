import { lazy } from "react"
import { IAppMeta } from "../type"

const metaModules = import.meta.glob("./*/meta.json")

export const AppMetas: Record<string, IAppMeta> = {}
export const Apps: Record<
	string,
	{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		content: React.LazyExoticComponent<React.ComponentType<any>>
		name: string
	}
> = {}

for (const path in metaModules) {
	metaModules[path]().then(mod => {
		const match = path.match(/\/(\w+)\//)
		if (!match) {
			console.error("未找到匹配项", path)
			return
		}
		const key = match[1]
		const meta = (mod as { default: IAppMeta }).default
		AppMetas[key] = meta
		Apps[key] = {
			content: lazy(() => import(`./${key}/index.tsx`)),
			name: meta.name
		}
	})
}
