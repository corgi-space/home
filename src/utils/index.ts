export const loadScript = (url: string, callback?: Function) => {
	const script = document.createElement("script")
	script.src = url
	script.async = true

	// 定义回调函数
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	window.jsonpCallback = function (data: any) {
		// 	// 在回调函数中获取到数据后，执行传入的回调函数
		callback && callback(data)
		// 	// 删除script标签，以便释放资源
		// 	// document.body.removeChild(script)
	}

	if (!url.includes("jsonpCallback")) {
		script.onload = () => {
			callback && callback()
		}
	}

	// 将script标签添加到页面中
	document.body.appendChild(script)
}

export const addZero = (num: number) => {
	return num < 10 ? "0" + num : "" + num
}
