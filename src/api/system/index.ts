import type {
	ICreateNotice,
	ILoginParams,
	IMessageItem,
	IUpdateUserInfo,
	IUserInfo
} from "./types/index"
import { Get, Post, Put } from "@/utils/request"

export const UserLogin = (params: ILoginParams) => {
	return Post<IUserInfo>({
		url: "/system/login",
		params
	})
}

export const GetUserInfo = () => {
	return Get({
		url: "/system/getInfo"
	})
}

export const UpdateUserInfo = (data: IUpdateUserInfo) => {
	return Put({
		url: "/system/updateMemberInfo",
		data
	})
}

export const GetMessageList = () =>
	Get<IMessageItem[]>({
		url: "/system/messageList"
	})

export const CreateMessage = (data: ICreateNotice) =>
	Post<null>({
		url: "/system/createNotice",
		data
	})

export const GetUnreadMessage = () =>
	Get<IMessageItem[]>({
		url: "/system/messageList"
	})
