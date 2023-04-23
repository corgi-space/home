const ExpirationTime = 7 * 24 * 60 * 60 * 1000

export function getLocalStorage(list: string[]): Record<string, any> {
	const res: Record<string, any> = {}

	list.forEach(key => {
		const item = localStorage.getItem(key)
		if (item) {
			const { value, _saveTime } = JSON.parse(item)

			if (_saveTime + ExpirationTime > new Date().getTime()) {
				res[key] = value
			} else {
				localStorage.removeItem(key)
				res[key] = null
			}
		}
	})

	return res
}

export function setLocalStorage(key: string, data: unknown) {
	localStorage.setItem(
		key,
		JSON.stringify({
			value: data,
			_saveTime: new Date().getTime()
		})
	)
}

export function removeLocalStorege(key: string) {
	localStorage.removeItem(key)
}
