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

export interface IUpdateUserInfo {
	name?: string
	email?: number
	photo?: string
}

export interface ILoginParams {
	email: string
	password: string
}

export interface ICreateNotice {
	title: string
	content: string
	target: number[]
}

export interface IMessageItem {
	id: number
	senderId: number
	senderName: string
	content: string
	carryInfo?: ITaskItem
	carryType?: "task"
	status: 1 | 2 // 未读 1； 已读 2
}

export enum TaskStatus {
	NotDone = 1,
	Doing = 2,
	Done = 3,
	Timeout = 4
}

export interface ITaskItem {
	id: number
	createUserId: number
	createUserName: string
	title: string
	content: string
	status: TaskStatus
	deadline: string
	createTime: string
	assignUserId: number
	assignUserName: string
}
