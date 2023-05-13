export interface IUserInfo {
	userId: number
	name: string
	email: number
	photo: string
	roleId: number
	roleName: string
	gender: number
	status: number
	token: string
}

export interface ILoginParams {
	email: string
	password: string
}
