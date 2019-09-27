import store from 'store'
export const USERKEY = "_user_key";

export const setLocalUser = userinfo => {
    store.set(USERKEY, userinfo);
}

export const getLocalUser = () => {
    return store.get(USERKEY);
}

export const clearLocalUser = () => {
    store.remove(USERKEY);
}