import { CHANGE_LOADING, CHANGE_USERINO,CHANGE_COLLAPSED } from "./type";

export const setLoading = value => ({
    type: CHANGE_LOADING,
    value
})

export const setUserInfo=user=>({
    type:CHANGE_USERINO,
    user
})

export const setMenuCollapsed=value=>({
    type:CHANGE_COLLAPSED,
    value
})