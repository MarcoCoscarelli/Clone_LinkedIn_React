import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Importa i reducers
import ProfileSectionReducer from "../reducers/ProfileSection";
import postReducers from "../reducers/Post";
import homePost from "../reducers/homePost";
import HomeUserPost from "../reducers/homeUserPost";
import userReducer from "../reducers/userReducer";

// Configurazione per redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'bearerToken'], // Aggiungi qui le chiavi dei reducers che vuoi persistere
};

// Combina i reducers
const globalReducer = combineReducers({
  profile: ProfileSectionReducer,
  posts: postReducers,
  homePosts: homePost,
  user: userReducer, // Assicurati di includere userReducer
  homeUserPost: HomeUserPost, // Modificato il nome per evitare conflitti
});

// Crea il reducer persistente
const persistedReducer = persistReducer(persistConfig, globalReducer);

// Configura lo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Crea il persistor
export const persistor = persistStore(store);

export default store;
