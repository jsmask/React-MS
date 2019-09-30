import { CHANGE_LOADING, CHANGE_USERINO, CHANGE_COLLAPSED, CHANGE_LOGOUT } from "./type";

export const setLoading = value => ({
    type: CHANGE_LOADING,
    value
})

export const setUserInfo = user => ({
    type: CHANGE_USERINO,
    user
})

export const setMenuCollapsed = value => ({
    type: CHANGE_COLLAPSED,
    value
})

export const setLogout = () => ({
    type: CHANGE_LOGOUT
})