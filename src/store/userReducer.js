import { CHANGE_USERINO, CHANGE_LOGOUT } from "./type";
import { clearLocalUser } from '../utils/local'

const defaultUser = {
    info: null,
}

export default function reducer(state = defaultUser, action) {
    switch (action.type) {
        case CHANGE_USERINO:
            return {
                ...state,
                info: action.user
            }
        case CHANGE_LOGOUT:
            clearLocalUser();
            return {
                ...state,
                info: null
            }
        default:
            return state;
    }
}