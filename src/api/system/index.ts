import type { ILoginParams, IMessageItem, IUserInfo } from "./types/index"
import { Get, Post } from "@/utils/request"

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

export const GetMessageList = () =>
	Get<IMessageItem[]>({
		url: "/system/messageList"
	})

export const GetUnreadMessage = () =>
	Get<IMessageItem[]>({
		url: "/system/messageList"
	})
