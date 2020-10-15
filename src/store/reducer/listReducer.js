const INITIAL_STATE = {
    data: [],
}

export default function (state = INITIAL_STATE, action){
    if (action.type === '@SETLIST') {
        return {...state, data: action.payload }
    }
    return state;
}