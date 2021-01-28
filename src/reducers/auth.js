const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: {},
    isLoading: false,
    errors: {}
}

export default function(state=initialState, action) {
    switch (action.type) {

        case 'USER_LOADING':
            return {...state, isLoading:true}

        case 'USER_LOADED':
            return {...state, isAuthenticated: true,isLoading:false, user: action.payload}

        case 'LOGIN_SUCCESSFUL':
            localStorage.setItem("token", action.payload.token);
            return {...state, ...action.payload, isAuthenticated: true, isLoading: false, errors: null};

        case 'LOGIN_FAILED':
            return {...state,errors: action.payload,isAuthenticated:false,isLoading:false}

        case 'LOGOUT_SUCCESSFUL':
            localStorage.removeItem("token");
            return {...state, token: null, user: null,isAuthenticated: false, isLoading: false}; 
        case 'MODIF_SUCCESS':
            return {...state,...action.payload,errors:null}
        case 'MODIF_FAIL':
            return {...state,errors:action.payload}
        default:
            return state
    }
}