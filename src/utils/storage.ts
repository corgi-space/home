const ExpirationTime = 7 * 24 * 60 * 60 * 1000 // 过期时间 7天

export function getLocalStorage(list: string[]): Record<string, unknown> {
	const res: Record<string, unknown> = {}

	list.forEach(key => {
		const item = localStorage.getItem(key)
		if (item) {
			const { value, _expirationTime } = JSON.parse(item)

			if (_expirationTime > new Date().getTime()) {
				res[key] = value
			} else {
				localStorage.removeItem(key)
				res[key] = null
			}
		}
	})

	return res
}

export function setLocalStorage(
	key: string,
	data: unknown,
	expirationTime?: number
) {
	localStorage.setItem(
		key,
		JSON.stringify({
			value: data,
			_expirationTime: new Date().getTime() + (expirationTime || ExpirationTime)
		})
	)
}

export function removeLocalStorege(key: string) {
	localStorage.removeItem(key)
}
