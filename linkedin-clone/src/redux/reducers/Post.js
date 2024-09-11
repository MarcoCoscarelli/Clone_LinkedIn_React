import {
  ADD_POST,
  MOD_POST,
  ADD_IMAGE_TO_POST,
  SET_IMAGE,
  FETCH_POSTS,
  DELETE_POST,
  DELETE_FROM_FAVOURITES,
} from "../actions/ProfileSection";

const initialState = {
  posts: [],
  image: null,
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {

    // Gestisce il caricamento dei post tramite fetch
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case MOD_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? {
                ...post,
                text: action.payload.text,
              }
            : post
        ),
      };

    case ADD_IMAGE_TO_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                imageUrl: action.payload.imageUrl,
              }
            : post
        ),
      };

      case DELETE_FROM_FAVOURITES:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };

    case SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    
    
      //  controlla l eliminazione dei
      
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };

        
  
      default:
        return state;
    }
  };
export default postReducers;

