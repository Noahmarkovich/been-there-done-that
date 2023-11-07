import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileService } from "../services/profile.service";
import { CountriesList } from "../components/countries-list";
import { store } from "../store/store";
import { SET_ACTIVE_PROFILE } from "../store/profile.reducer";
import { dispatchProfile } from "../store/profile.actions";

export function ProfilePage() {
  const profiles = useSelector(
    (storeState) => storeState.profileModule.profile
  );
  const { profileId } = useParams();
  const activeProfile = useSelector(
    (storeState) => storeState.profileModule.activeProfile
  );
  // const [activeProfile, setActiveProfile] = useState(null);

  useEffect(() => {
    if (profileId) {
      loadCurrProfile();
    }
  }, []);

  async function loadCurrProfile() {
    try {
      const activeProfile = await profileService.getById(profileId);
      // setActiveProfile(currProfile);
      dispatchProfile(SET_ACTIVE_PROFILE, activeProfile);
    } catch (err) {
      console.log(err);
    }
  }

  if (!activeProfile) return <div>loading</div>;
  return (
    <section className="profile-page">
      <header className="profile-header">
        <div className="profile-container">
          <img
            className="profile"
            src={require("../assets/img/noah-profile.jpg")}
            alt="profile"
          />
          <div>
            <h2>A traveler's blog by:</h2>
            <h1> {activeProfile.fullName}</h1>
          </div>
        </div>
      </header>
      <section className="intro-profile">
        <div className="intro-txt">
          <div className="txt-container">
            <h1>About me</h1>
            <p>{activeProfile.aboutMe}</p>
          </div>
        </div>
        <img src={require("../assets/img/intro-img.jpg")} alt="intro-img" />
      </section>
      <CountriesList
        countries={activeProfile.countries}
        profile={activeProfile}
      />
      <Outlet context={[profileId]} />
    </section>
  );
}
