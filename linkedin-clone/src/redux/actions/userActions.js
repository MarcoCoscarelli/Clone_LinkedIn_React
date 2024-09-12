// Action types
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGOUT = 'LOGOUT';

export const loginUser = () => ({
  type: LOGIN_PENDING
});

export const loginUserSuccess = (userData, bearerToken) => ({
  type: LOGIN_FULFILLED,
  payload: { user: userData, bearerToken }
});

export const loginUserFailure = (error) => ({
  type: LOGIN_REJECTED,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});