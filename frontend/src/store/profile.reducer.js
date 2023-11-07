export const SET_PROFILES = "SET_PROFILES";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
export const ADD_PROFILE = "ADD_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UNDO_REMOVE_PROFILE = "UNDO_REMOVE_PROFILE";
export const SET_ACTIVE_PROFILE = "SET_ACTIVE_PROFILE";

const initialState = {
  profiles: [],
  activeProfile: null,
};

export function profileReducer(state = initialState, action) {
  let newState = state;
  let profiles;
  switch (action.type) {
    case SET_PROFILES:
      newState = { ...state, profiles: action.profiles };
      break;
    case SET_ACTIVE_PROFILE:
      newState = { ...state, activeProfile: action.activeProfile };
      break;
    case REMOVE_PROFILE:
      const lastRemovedCar = state.profiles.find(
        (profile) => profile._id === action.profileId
      );
      profiles = state.profiles.filter(
        (profile) => profile._id !== action.profileId
      );
      newState = { ...state, profiles, lastRemovedCar };
      break;
    case ADD_PROFILE:
      newState = { ...state, profiles: [...state.profiles, action.profile] };
      break;
    case UPDATE_PROFILE:
      profiles = state.profiles.map((profile) =>
        profile._id === action.profile._id ? action.profile : profile
      );
      newState = { ...state, profiles };
      break;
    default:
  }
  return newState;
}
