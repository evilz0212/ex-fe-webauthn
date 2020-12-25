import path from "path"

export default {
	alias: {
		"/@/": path.resolve(__dirname, "./src"),
	},
	cssPreprocessOptions: {
		scss: {
			additionalData: `@import "./src/styles/_prepend.scss";`,
		},
	},
	httpsOptions: {
		key: "./dev/certificate/server.key",
		cert: "./dev/certificate/server.crt",
	},
	proxy: {
		"/api": {
			// target: "https://jsonserver:7000",
			target: "https://carlos-webauthn-example.tk:8899/api",
			// 可跨域
			changeOrigin: true,
			// 無效證書：接受=>false
			secure: false,
			// webSocket
			// ws: true,
			rewrite: (path) => path.replace(/^\/api/, ""),
		},
	},
}
