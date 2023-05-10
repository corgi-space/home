export interface IUserInfo {
	userId: number
	userName: string
	phone: number
	photo: string
	roleId: number
	roleName: string
	token: string
}

export interface ILoginParams {
	account: string
	password: string
}
