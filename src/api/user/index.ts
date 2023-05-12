import type { ILoginParams, IUserInfo } from "./types/index"
import { Post } from "@/utils/request"

export const UserLogin = (params: ILoginParams) => {
	return Post<{ userInfo: IUserInfo }>({
		url: "http://127.0.0.1:4523/m1/2323675-0-default/root/userLogin",
		params
	})
}
