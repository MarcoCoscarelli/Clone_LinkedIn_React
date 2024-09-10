const initialState = {
  user: null,
  loading: false,
  error: null,
  bearerToken: null // Aggiungiamo il bearerToken allo stato iniziale
};

// Definiamo le action types
const LOGIN_PENDING = 'user/login/pending';
const LOGIN_FULFILLED = 'user/login/fulfilled';
const LOGIN_REJECTED = 'user/login/rejected';
const LOGOUT = 'user/logout';

// Reducer
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
        bearerToken: action.payload.bearerToken, // Salviamo il bearerToken
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
        bearerToken: null, // Rimuoviamo il bearerToken al logout
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

// Action creators
export const logout = () => ({
  type: LOGOUT
});

export default userReducer;