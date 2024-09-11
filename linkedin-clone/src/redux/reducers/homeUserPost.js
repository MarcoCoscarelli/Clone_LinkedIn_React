import { SET_PROFILE } from "../actions/homePostAction";

const initialState = {
  user: null, // Stato iniziale per l'utente
};

const HomeUserPost = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default HomeUserPost;
