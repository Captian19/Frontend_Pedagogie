import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: 'USER_LOADING' });
  
    axios
      .get('https://users-ent.herokuapp.com/api/auth/user', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
    });
};
  
export const login = (email, password) => dispatch => {
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      // Request Body
      const body = JSON.stringify({ email, password });
    
      axios
        .post('https://users-ent.herokuapp.com/api/auth/login/', body, config)
        .then((res) => {
          dispatch({
            type: 'LOGIN_SUCCESSFUL',
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: 'LOGIN_FAILED',
            payload: err.response.data
          });
        });
}


export const logout = () => (dispatch, getState) => {
    axios
      .post('https://users-ent.herokuapp.com/api/auth/logout/', null, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: 'LOGOUT_SUCCESSFUL',
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
};


export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };
