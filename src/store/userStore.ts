import { create } from "zustand"
import {
	getLocalStorage,
	removeLocalStorege,
	setLocalStorage
} from "@/utils/storage"
import { IUserInfo } from "@/api/user/types"
// export const LoginAction = createAsyncThunk("user/login", UserLogin)

type Store = {
	userInfo: IUserInfo | null

	updateUserInfo: (v: IUserInfo) => void
	clear: () => void
}

const useUserStore = create<Store>(set => ({
	userInfo: getLocalStorage<IUserInfo>("userInfo") || null,

	updateUserInfo: val => {
		set({ userInfo: val })
		setLocalStorage("userInfo", val)
	},

	clear: () => {
		removeLocalStorege("userInfo")
		set({ userInfo: null })
	}
}))

export const tokenComputed = (s: Store) => s.userInfo?.token

export default useUserStore
