import { api } from "/@/apis/modules"
import { useStore } from "/@/store"
import { router } from "/@/router"
import WebAuthn from "/@/plugins/webauthn.js"

const store = useStore()
const webauthn = new WebAuthn()

export const register = async (data) => {
	console.log(data)
	return await api.user
		.postRegister(data)
		.then((response) => {
			let res = response.data

			store.dispatch("auth/saveAuth", {
				token: res.token,
				isLogin: true,
			})
		})
		.then(() => {
			router.push("/member")
		})
		.catch((error) => {
			console.log(error)
			switch (error.response.status) {
				case 406:
					return "Registration failed, please try again."
				case 500:
					return "This email has already been registered, please try again."
				default:
					return "Registration failed, please try again."
			}
		})
}

export const webauthnDestroy = async (data) => {
	return await api.user
		.deleteWebauthnKey(data)
		.then((res) => {
			return "Security key deleted."
		})
		.catch((error) => {
			switch (error.response.status) {
				default:
					return "Failed to delete."
			}
		})
}

export const webauthnRegister = async (data) => {
	return await api.user.getWebauthnRegister(data).then(async (res) => {
		// console.log(res.data.publicKey)
		let publicKey = res.data.publicKey
		let registerKey = null
		await webauthn.register(publicKey, (key) => {
			registerKey = JSON.stringify(key)
		})

		if (registerKey) {
			return await api.user
				.postWebauthnRegister({
					register: registerKey,
					name: res.data.publicKey.user.name,
				})
				.then((res) => {
					console.log(res.data)
					return "Registration success."
				})
				.catch((error) => {
					console.log(error)
					switch (error.response.status) {
						default:
							return "Registration failed."
					}
				})
		}
	})
}

export const login = async ({ email, password }) => {
	// 登入，獲取用戶資訊&登入憑證
	return await api.user
		.postLogin({ email, password })
		.then((response) => {
			let res = response.data
			// console.log(res.user.haskey)

			store.dispatch("auth/saveToken", {
				token: res.token,
			})

			return res.user.haskey
		})
		.then(async (haskey) => {
			if (haskey) {
				console.log("login haskey")
				await webauthnLogin()
			} else {
				// 儲存用戶資訊&登入憑證
				store.dispatch("auth/saveIsLogin", {
					isLogin: true,
				})
			}
		})
		.then(() => {
			router.push("/member")
		})
		.catch((error) => {
			console.log(error.response.status)
			switch (error.response.status) {
				case 406:
					return "The account or password is incorrect, please try again."
				default:
					return "Login failed, please try again."
			}
		})
}

export const webauthnLogin = async (data) => {
	await api.user.getWebauthnLogin(data).then(async (res) => {
		// console.log(res.data.publicKey)
		let publicKey = res.data.publicKey
		let loginKey = null

		await webauthn.sign(publicKey, (key) => {
			loginKey = JSON.stringify(key)
		})

		if (loginKey) {
			await api.user
				.postWebauthnLogin({ data: loginKey })
				.then((res) => {
					// console.log(res.data)
					store.dispatch("auth/saveIsLogin", {
						isLogin: res.data.result,
					})
				})
				.then((res) => router.push("/member"))
		}
	})
}

export const logout = async () => {
	// 登出，清除用戶資訊&登入憑證
	await store.dispatch("auth/removeAuth")
	await store.dispatch("user/removeUser")

	router.push("/login")
}

export const loadUser = () => {
	api.user.getUser().then((response) => {
		let res = response.data

		let user = res.user
		// console.log(user)
		store.dispatch("user/saveUser", user)
	})
}
