import axios from "axios"
import { router } from "/@/router"
import { useStore } from "/@/store"
import { tip, toLogin, to403Page } from "./utils.js"

const store = useStore()

// 請求失敗的統一處理
// param => status: 請求失敗的狀態碼
const errorHandle = (status, msg) => {
	switch (status) {
		// 400: 登入失敗，可能是帳號或密碼錯誤
		case 400:
			tip(msg)
			break

		// 401: 未登入或認證過期
		// 清除本地和 vuex 的 token
		case 401:
			// 清除 token
			store.dispatch("auth/removeAuth")

			if (router.currentRoute == "login") {
				// 由 login 後導向首頁
			} else {
				tip("登入過期，請重新登入")
				setTimeout(() => {
					toLogin()
				}, 1000)
			}
			break

		// 403: 權限不足
		case 403:
			to403Page()
			break

		// 404: 請求失敗
		case 404:
			tip(msg)
			break

		// 其他錯誤：直接拋出錯誤提示
		default:
			console.log(`res沒有攔截到的錯誤：${msg}`)
	}
}

// axios 實例
var instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "fido2.isac.tw",
		"Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
		"Access-Control-Allow-Headers":
			"Origin, X-Requested-With, Content-Type, Accept",
	},
	responseType: "json",
	responseEncoding: "utf8",
})
instance.defaults.withCredentials = true

// request 攔截器
instance.interceptors.request.use(
	(config) => {
		// 發送 req 前判斷 vuex 中是否存在 token
		// 若存在則統一在 http 請求的 header 都加上 token
		var token = store.state.auth.token
		token && (config.headers.Authorization = `Bearer ${token}`)
		// console.log("api request:")
		// console.log(config)
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// response 攔截器
instance.interceptors.response.use(
	(response) => {
		// console.log("api response:")
		// console.log(response)

		return response
	},
	(error) => {
		const { response } = error

		if (response) {
			// 成功發出請求，且有收到resp，但有error
			errorHandle(response.status, response.data.error)
			return Promise.reject(error)
		} else {
			// 成功發出請求，但沒收到resp
			if (!window.navigator.onLine) {
				// 如果是網路斷線
				tip("請確認網路連線狀態")
			} else {
				// 可能是跨域，或其他程式問題
				return Promise.reject(error)
			}
		}
	}
)

// 封裝請求方法
export default function (method, url, data = null) {
	method = method.toLowerCase()
	switch (method) {
		case "post":
			return instance.post(url, data)
			break

		case "get":
			return instance.get(url, { param: data })
			break

		case "delete":
			return instance.delete(url, { param: data })
			break

		case "put":
			return instance.put(url, data)
			break

		default:
			console.error(`未知的 method：${method}`)
			return false
	}
}
