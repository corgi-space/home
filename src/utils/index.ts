export const loadScript = (url: string, callback?: Function) => {
	const script = document.createElement("script")
	script.src = url
	script.async = true

	if (callback) {
		script.onload = () => {
			callback()
		}
	}

	document.body.append(script)
}

export const addZero = (num: number) => {
	return num < 10 ? "0" + num : "" + num
}
