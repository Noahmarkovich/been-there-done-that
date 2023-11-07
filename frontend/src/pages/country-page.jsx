import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dispatchProfile } from "../store/profile.actions";
import { SET_ACTIVE_PROFILE } from "../store/profile.reducer";
import { profileService } from "../services/profile.service";
import { useState } from "react";

export function CountryPage() {
  const { countryId, profileId } = useParams();
  const profiles = useSelector(
    (storeState) => storeState.profileModule.profile
  );
  const activeProfile = useSelector(
    (storeState) => storeState.profileModule.activeProfile
  );
  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(() => {
    if (profileId) {
      loadCurrProfile();
    }
  }, []);

  async function loadCurrProfile() {
    try {
      const activeProfile = await profileService.getById(profileId);
      const currentCountry = profileService.getCountryById(
        countryId,
        activeProfile
      );
      setCurrentCountry(currentCountry);
      dispatchProfile(SET_ACTIVE_PROFILE, activeProfile);
    } catch (err) {
      console.log(err);
    }
  }

  if (!currentCountry) return <div>Loading</div>;

  return (
    <div className="country-page">
      <header className="country-page-header">
        <img src={currentCountry.imgUrl} alt="country-img" />
        <h1>
          My journey in <span>{currentCountry.country}</span>
        </h1>
      </header>
      <section className="main-country-content">
        <div className="about-country">
          <h2>My Experience</h2>
          <div>{currentCountry.description}</div>
          <div>My overall rating: {currentCountry.rating}</div>
        </div>
        <div className="catagories">
          <h2>{currentCountry.categories.title}</h2>
          <div className="catagories-gallery">
            {currentCountry.categories.locations.map((location) => {
              return (
                <div key={location.id}>
                  <img src={location.coverImg} alt={location.name} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
