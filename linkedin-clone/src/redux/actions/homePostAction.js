export const ADD_HOME_POST = "ADD_HOME_POST";
export const FETCH_HOME_POSTS = "FETCH_HOME_POST";
export const SET_PROFILE = "SET_PROFILE";
export const DELETE_HOME_POST = "DELETE_HOME_POST";
export const SET_SINGLE_PROFILE = "SET_SINGLE_PROFILE";

//fetch per ottenere tutti i post
export const fetchHomePosts = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/posts/",
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
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
//fetch per il singolo profilo
export const fetchSingleProfile = (profileId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileId}`,
      {
        method: "GET",
        headers: {
          Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
        },
      }
    );
    if (response.ok) {
      const profileData = await response.json();
      dispatch({ type: SET_SINGLE_PROFILE, payload: profileData });
    } else {
      console.error("Errore nel recupero del profilo");
    }
  } catch (error) {
    console.error("Errore:", error);
  }
};