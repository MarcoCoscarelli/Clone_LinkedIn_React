// Action types
export const LOGIN_PENDING = 'user/login/pending';
export const LOGIN_FULFILLED = 'user/login/fulfilled';
export const LOGIN_REJECTED = 'user/login/rejected';
export const LOGOUT = 'user/logout';

export const loginUser = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginUserSuccess = (userData, bearerToken) => {
  return {
    type: LOGIN_FULFILLED,
    payload: { user: userData, bearerToken }
  };
};

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_REJECTED,
    payload: error
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// ... altre azioni ...