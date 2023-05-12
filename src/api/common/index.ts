import { Get } from "@/utils/request"

export const GetBingPhoto = () =>
	Get<string>({
		url: "/getBingPhoto"
	})
