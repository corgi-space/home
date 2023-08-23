import { theme } from "antd"

/**
 * 根据theme 读取自定义配置
 * @param curTheme
 */
export function getThemeConfig(curTheme: "dark" | "light", themeColor: string) {
	return {
		algorithm:
			curTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
		token: {
			colorPrimary: themeColor,
			fontFamily: "inherit"
		}
	}
}
