const ExpirationTime = 7 * 24 * 60 * 60 * 1000 // 过期时间 7天

export function getLocalStorage<T = unknown>(key: string): T | null {
	let res: unknown
	const item = localStorage.getItem(key)
	if (item) {
		const { value, _expirationTime } = JSON.parse(item)

		if (_expirationTime === "max" || _expirationTime > new Date().getTime()) {
			res = value
		} else {
			localStorage.removeItem(key)
			return null
		}
	}

	return res as T
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
			_expirationTime:
				expirationTime === 0
					? "max"
					: new Date().getTime() + (expirationTime || ExpirationTime)
		})
	)
}

export function removeLocalStorege(key: string) {
	localStorage.removeItem(key)
}
