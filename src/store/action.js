import { CHANGE_LOADING, CHANGE_USERINO } from "./type";

export const setLoading = value => ({
    type: CHANGE_LOADING,
    value
})

export const setUserInfo=user=>({
    type:CHANGE_USERINO,
    user
})