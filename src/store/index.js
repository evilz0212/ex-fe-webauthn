import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import auth from "./modules/auth"
import user from "./modules/user"

const vuexPersisted = new createPersistedState({
    storage: window.localStorage,
    reducer(val) {
        return {
            auth: val.auth,
            user: val.user,
        }
    },
})

const store = createStore({
    modules: {
        auth,
        user,
    },
    plugins: [vuexPersisted],
})

export function useStore() {
    return store
}
