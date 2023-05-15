import type { ILoginParams, IUserInfo } from "./types/index"
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
