import { message } from "antd"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import axios from "axios"
import useUserStore, { tokenComputed } from "@/store/userStore"

interface Result<T = unknown> {
	code: number
	msg: string
	data: T
}

// 创建axios实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // api的base_url
	timeout: 60 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (!config.url?.includes("https")) {
			const token = tokenComputed(useUserStore.getState())

			if (token) {
				config.headers.token = token
			}
		}

		/**
		 * 定义 在 post 中
		 *
		 * params 传参 以formData类型传递
		 *
		 * data 传参 以JSON类型传递
		 */
		if (config.method === "post") {
			if (!config.headers["Content-Type"]) {
				if (config.data) {
					config.headers["Content-Type"] = "application/json"
				} else {
					config.data = config.params
					config.headers["Content-Type"] = "application/x-www-form-urlencoded"
					delete config.params
				}
			}
		}

		return config
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	}
)

// respone拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code && res.code !== "200") {
			message.error({
				content: res.msg
			})

			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
			// if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
			// 	MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
			// 		confirmButtonText: "重新登录",
			// 		cancelButtonText: "取消",
			// 		type: "warning"
			// 	}).then(() => {
			// 		store.dispatch("FedLogOut").then(() => {
			// 			location.reload() // 为了重新实例化vue-router对象 避免bug
			// 		})
			// 	})
			// }
			return Promise.reject(res.info)
		} else {
			return res
		}
	},
	error => {
		console.log(`err${error}`) // for debug
		message.error({
			content: error.message
		})
		Promise.reject(error)
	}
)

interface requestOptions {
	url: string
	data?: unknown
	params?: unknown
	[x: string]: unknown
}

export function Get<T = unknown>(options: requestOptions): Promise<Result<T>> {
	return service({ ...options, method: "get" })
}
export function Post<T = unknown>(options: requestOptions): Promise<Result<T>> {
	return service({ ...options, method: "post" })
}
export function Put<T = unknown>(options: requestOptions): Promise<Result<T>> {
	return service({ ...options, method: "put" })
}

export default service
