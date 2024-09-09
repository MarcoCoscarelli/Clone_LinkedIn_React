import { MY_PROFILE } from '../actions/ProfileSection'

const initialState = {
  profile: null,
}

const ProfileSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PROFILE:
      return {
        ...state,
        profile: action.payload,
      }

    default:
      return state
  }
}
export default ProfileSectionReducer
