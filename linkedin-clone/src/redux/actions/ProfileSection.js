export const MY_PROFILE = "MY_PROFILE";
export const ADD_POST = "ADD_POST";
export const ADD_IMAGE_TO_POST = "ADD_IMAGE_TO_POST";
export const MOD_POST = "MOD_POST";
export const SET_IMAGE = "SET_IMAGE";
export const DELETE_FROM_FAVOURITES = "DELETE_FROM_FAVOURITES";
export const FETCH_POSTS = "FETCH_POSTS";
export const DELETE_POST = "DELETE_POST";

// Action per eliminzione post
export const deletePostAction = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});


// Action per ottenere il profilo dell'utente
export const myProfile = () => {
  const url = "https://striveschool-api.herokuapp.com/api/profile/me";
  
  
  return async (dispatch, getState) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getState().user.bearerToken}`, 
        },
      });

      if (res.ok) {
        const data = await res.json();
        dispatch({ type: MY_PROFILE, payload: data });
      } else {
        throw new Error(`${res.status} - Errore nella fetch`);
      }
    } catch (err) {
      console.log("Errore durante il fetch del profilo:", err);
    }
  };
};

// Action per ottenere i post dell'utente
export const fetchPosts = () => {
  const url = "https://striveschool-api.herokuapp.com/api/posts/";
  
  
  return async (dispatch, getState) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getState().user.bearerToken}`, 
        },
      });

      if (res.ok) {
        const data = await res.json();
        dispatch({ type: FETCH_POSTS, payload: data });
      } else {
        throw new Error(`${res.status} - Errore nella fetch dei post`);
      }
    } catch (err) {
      console.log("Errore durante il fetch dei post:", err);
    }
  };
};



// Azioni per la gestione dei post
export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

export const modPost = (post) => {
  return {
    type: MOD_POST,
    payload: post,
  };
};

export const addImageToPost = (postId, imageUrl) => {
  return {
    type: ADD_IMAGE_TO_POST,
    payload: { postId, imageUrl },
  };
};

// Action per settare l'immagine del profilo
export const setImage = (image) => ({
  type: SET_IMAGE,
  payload: image,
});

// Action per rimuovere un post dai preferiti
export const deleteFromFavouriteAction = (postId) => {
  return {
    type: DELETE_FROM_FAVOURITES,
    payload: postId,
  };
};

