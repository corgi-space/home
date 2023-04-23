import { theme } from "antd"

/**
 * 根据theme 读取自定义配置
 * @param curTheme
 */
export function getThemeConfig(curTheme: "dark" | "light") {
	return {
		algorithm:
			curTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
	}
}
