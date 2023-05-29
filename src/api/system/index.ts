import type {
	ICreateNotice,
	ILoginParams,
	IMessageItem,
	INoticeItem,
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

export const GetNoticeList = (params: IPage) =>
	Get<ITable<INoticeItem>>({
		url: "/system/getNoticeList",
		params
	})

export const CreateNotice = (data: ICreateNotice) =>
	Post<null>({
		url: "/system/createNotice",
		data
	})

export const GetNoticeDetails = (id: number) =>
	Get({
		url: `/system/getNotice/${id}`
	})

export const GetUnreadMessage = () =>
	Get<IMessageItem[]>({
		url: "/system/messageList"
	})
