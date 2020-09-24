const INITIAL_STATE = {
    logged: false,
    data: null,
}

export default function (state = INITIAL_STATE, action){
    console.log(action)
    if (action.type === '@LOGIN') {
        return {...state, logged: true, data: action.payload }
    }
    return state;
}