import { LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED, LOGOUT } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  bearerToken: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        bearerToken: action.payload.bearerToken,
        error: null
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        bearerToken: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;