import { CHANGE_LOADING, CHANGE_COLLAPSED } from './type';

const defaultParams = {
    isLoading: false,
    isCollapsed: false
}

export default function reducer(state = defaultParams, action) {
    switch (action.type) {
        case CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.value
            };
        case CHANGE_COLLAPSED:
            return {
                ...state,
                isCollapsed: action.value
            }
        default:
            return state;
    }
}