import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { profileService } from "../services/profile.service";
import { ImgUploader } from "../components/img-uploader";
import { addCountry, dispatchProfile } from "../store/profile.actions";
import { SET_ACTIVE_PROFILE } from "../store/profile.reducer";

export function AddCountry() {
  const [profileId, setActiveProfile] = useOutletContext();
  const navigate = useNavigate();
  const [newCountry, setNewCountry] = useState(
    profileService.getEmptyCountry()
  );
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  });

  function handleChange({ target }) {
    const { value, name: field } = target;
    setNewCountry((prevCountry) => ({ ...prevCountry, [field]: value }));
  }

  async function onAddCountry(ev) {
    ev.preventDefault();
    try {
      newCountry.imgUrl = imgData.imgUrl;
      const updatedCountry = await addCountry(newCountry, profileId);
      // setActiveProfile(updatedCountry);
      dispatchProfile(SET_ACTIVE_PROFILE, updatedCountry);
      navigate(`/profile/${profileId}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(imgData);
  return (
    <section className="dark-screen">
      <div className="add-country">
        <header>
          <h1>Where else did you visit?</h1>
        </header>
        <form className="add-country-form" onSubmit={(ev) => onAddCountry(ev)}>
          <label>
            {" "}
            Country name
            <input
              name="country"
              placeholder="for example: Israel"
              value={newCountry.country}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {" "}
            Rate the total experience
            <input
              type="number"
              name="rating"
              placeholder="for example: 4.2"
              value={newCountry.rating}
              onChange={handleChange}
            />
          </label>
          <label>
            {" "}
            Describe the total experience
            <textarea
              name="description"
              placeholder="for example: I love this country for it's lovely beaches and worm people"
              value={newCountry.description}
              onChange={handleChange}
            />
          </label>

          <ImgUploader
            setNewCountry={setNewCountry}
            imgData={imgData}
            setImgData={setImgData}
          />
          <div className="btn-container">
            <button className="add-btn">Add destination</button>
            <button>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
}
