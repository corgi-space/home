import { lazy } from "react"
import { IAppMeta } from "../type"

const metaModules = import.meta.glob("./*/meta.ts")

export const AppMetas: Record<string, IAppMeta> = {}
export const Apps: Record<
	string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	React.LazyExoticComponent<React.ComponentType<any>>
> = {}

for (const path in metaModules) {
	metaModules[path]().then(mod => {
		const match = path.match(/\/(\w+)\//)
		if (!match) {
			console.error("未找到匹配项", path)
			return
		}
		const key = match[1]
		AppMetas[key] = (mod as { default: IAppMeta }).default
		Apps[key] = lazy(() => import(`./${key}/index.tsx`))
	})
}
