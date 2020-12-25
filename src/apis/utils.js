import { router } from "/@/router"

// 提示錯誤
export const tip = (msg) => {
    console.log(`error: ${msg}`)
}

// 跳轉到登入頁，登入後回到原本頁面
export const toLogin = () => {
    router.replace({
        path: "/login",
        query: {
            redirect: router.currentRoute.fullPath,
        },
    })
}

// 跳轉到 403 頁面
export const to403Page = () => {
    router.replace({
        name: "403",
    })
}
