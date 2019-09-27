import { CHANGE_USERINO } from "./type";


const defaultUser={
    info:null,
}

export default function reducer(state=defaultUser, action) {
    switch(action.type){
        case CHANGE_USERINO:
            return {
                ...state,
                info:action.user
            }
        default:
            return state;    
    }
}