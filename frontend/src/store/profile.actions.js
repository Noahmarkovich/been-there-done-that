import { profileService } from "../services/profile.service.js";
import { store } from "./store.js";
import { SET_PROFILES, UPDATE_PROFILE } from "./profile.reducer.js";

export async function loadProfiles() {
  try {
    const profiles = await profileService.query();
    store.dispatch({
      type: SET_PROFILES,
      profiles,
    });
  } catch (err) {
    console.log("Cannot load profiles", err);
    throw err;
  }
}

export async function addCountry(newCountry, profileId) {
  try {
    const savedProfile = await profileService.saveCountry(
      newCountry,
      profileId
    );

    store.dispatch({
      type: UPDATE_PROFILE,
      savedProfile,
    });

    return savedProfile;
  } catch (err) {
    console.log("Cannot add country", err);
    throw err;
  }
}
export function dispatchProfile(type, activeProfile) {
  store.dispatch({
    type,
    activeProfile,
  });
}
