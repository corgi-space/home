const ExpirationTime = 7 * 24 * 60 * 60 * 1000 // 过期时间 7天

export function getStorage<T = unknown>(
	key: string,
	fn: Storage = localStorage
): T | null {
	let res: unknown
	const item = fn.getItem(key)
	if (item) {
		const { value, _expirationTime } = JSON.parse(item)

		if (_expirationTime === "max" || _expirationTime > new Date().getTime()) {
			res = value
		} else {
			fn.removeItem(key)
			return null
		}
	}

	return res as T
}

export function setStorage({
	key,
	data,
	expirationTime,
	fn
}: {
	key: string
	data: unknown
	expirationTime?: number
	fn?: Storage
}) {
	fn = fn || localStorage
	fn.setItem(
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

export function removeStorege(key: string, fn: Storage = localStorage) {
	fn.removeItem(key)
}
