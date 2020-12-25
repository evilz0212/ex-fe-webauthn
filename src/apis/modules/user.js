import req from "/@/apis/https.js"

// 定義接口
export const postRegister = (params) => req("post", `/auth/register`, params)
export const postLogin = (params) => req("post", `/auth/login`, params)
export const getUser = () => req("get", `/auth/getUser`)

// webauthn test
export const getWebauthnRegister = (params) =>
	req("get", `/webauthn/register`, params)
export const postWebauthnRegister = (params) =>
	req("post", `/webauthn/register`, params)
export const deleteWebauthnKey = (key) => req("delete", `/webauthn/${key}`)
export const getWebauthnLogin = (params) => req("get", `/webauthn/auth`, params)
export const postWebauthnLogin = (params) =>
	req("post", `/webauthn/auth`, params)

// 定義接口(test for json-server)
// export const postRegister = (params) => req("post", "/register", params)
// export const postLogin = (params) => req("post", "/login", params)
// export const getUser = (id) => req("get", `/user/${id}`)
