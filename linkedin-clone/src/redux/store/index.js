import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ProfileSectionReducer from '../reducers/ProfileSection'
import postReducers from '../reducers/Post'


const globalReducer = combineReducers({
  profile: ProfileSectionReducer,
  posts: postReducers,
  
})

const store = configureStore({
  reducer: globalReducer,
})

export default store
