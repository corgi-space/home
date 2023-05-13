import type { ILoginParams, IUserInfo } from "./types/index"
import { Post } from "@/utils/request"

export const UserLogin = (params: ILoginParams) => {
	return Post<IUserInfo>({
		url: "/system/login",
		params
	})
}
