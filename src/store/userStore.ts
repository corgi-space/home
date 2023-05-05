import { create } from "zustand"
import { getStorage, removeStorege, setStorage } from "@/utils/storage"
import { IUserInfo } from "@/api/user/types"
// export const LoginAction = createAsyncThunk("user/login", UserLogin)

type Store = {
	userInfo: IUserInfo | null

	updateUserInfo: (v: IUserInfo) => void
	clear: () => void
}

const useUserStore = create<Store>(set => ({
	userInfo: getStorage<IUserInfo>("userInfo") || null,

	updateUserInfo: val => {
		set({ userInfo: val })
		setStorage({
			key: "userInfo",
			data: val
		})
	},

	clear: () => {
		removeStorege("userInfo")
		set({ userInfo: null })
	}
}))

export const tokenComputed = (s: Store) => s.userInfo?.token

export default useUserStore
