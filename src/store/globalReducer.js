import { CHANGE_LOADING } from './type';

const defaultParams={
    isLoading:false,
}

export default function reducer(state=defaultParams, action) {
    switch (action.type) {
        case CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.value
            }    
        default:
            return state;
    }
}