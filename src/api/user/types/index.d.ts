export interface IUserInfo {
	account: string
	phone: number
	photo: string
	roleId: number
	token: string
	userId: number
	userName: string
}

export interface ILoginParams {
	account: string
	password: string
}
