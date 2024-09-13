export const ADD_HOME_POST = "ADD_HOME_POST";
export const FETCH_HOME_POSTS = "FETCH_HOME_POST";
export const SET_PROFILE = "SET_PROFILE";
export const DELETE_HOME_POST = "DELETE_HOME_POST";

//fetch per ottenere tutti i post
export const fetchHomePosts = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/posts/",
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlY2FkODRkMGRlZjAwMTVjZWYxMDMiLCJpYXQiOjE3MjU4OTY2ODMsImV4cCI6MTcyNzEwNjI4M30.UMss5w-kKWhh82MNP_XXrl81zWY5Eu9fIi17fe-n7eY",
      },
    }
  );
  const data = await response.json();
  return data;
};

//Nuovo post
export const createHomePost = (content) => async (dispatch) => {
  const newPost = {
    text: content,
  };

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/posts/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlY2FkODRkMGRlZjAwMTVjZWYxMDMiLCJpYXQiOjE3MjU4OTY2ODMsImV4cCI6MTcyNzEwNjI4M30.UMss5w-kKWhh82MNP_XXrl81zWY5Eu9fIi17fe-n7eY",
        },
        body: JSON.stringify(newPost),
      }
    );
    if (response.ok) {
      const createdPost = await response.json();
      dispatch({ type: ADD_HOME_POST, payload: createdPost });
    }
  } catch (error) {
    console.error("Error creating post", error);
  }
};
 //fetch per il profilo utente
export const fetchUserProfile = () => async (dispatch) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlY2FkODRkMGRlZjAwMTVjZWYxMDMiLCJpYXQiOjE3MjU4OTY2ODMsImV4cCI6MTcyNzEwNjI4M30.UMss5w-kKWhh82MNP_XXrl81zWY5Eu9fIi17fe-n7eY",
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log('User data', userData);
        dispatch({ type: SET_PROFILE, payload: userData });
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };
//fetch per cancellare il post
export const deleteHomePost = (postId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlY2FkODRkMGRlZjAwMTVjZWYxMDMiLCJpYXQiOjE3MjU4OTY2ODMsImV4cCI6MTcyNzEwNjI4M30.UMss5w-kKWhh82MNP_XXrl81zWY5Eu9fIi17fe-n7eY",
        },
      }
    );
    if (response.ok) {
      dispatch({ type: DELETE_HOME_POST, payload: postId });
    } else {
      console.error("Errore nella cancellazione del post.");
    }
  } catch (error) {
    console.error("Errore nella cancellazione del post", error);
  }
};
