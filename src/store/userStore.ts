import { create } from "zustand"
import { getStorage, removeStorege, setStorage } from "@/utils/storage"
import { IUserInfo } from "@/api/user/types"

type Store = {
	userInfo: IUserInfo | null

	updateUserInfo: (v: Partial<IUserInfo>) => void
	clear: () => void
}

const useUserStore = create<Store>((set, get) => ({
	userInfo: getStorage<IUserInfo>("userInfo") || null,

	updateUserInfo: val => {
		const _userInfo = get().userInfo
		const newUserInfo = Object.assign(_userInfo || {}, val) as IUserInfo

		/**
		 *  调用更新用户的接口
		 */

		set({
			userInfo: newUserInfo
		})
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
