import { useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { AddCountryButton } from "./add-country-button";
import { CountryPreview } from "./country-preview";
import { useNavigate } from "react-router-dom";

export function CountriesList({ countries, profile }) {
  const sliderRef = useRef(null);
  const scrollAmount = 100;
  const navigate = useNavigate();

  return (
    <section className="countries-scroll">
      <button
        className="nav-btn left"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount;
        }}
      >
        <FiChevronLeft />
      </button>
      <div className="countries-list" ref={sliderRef}>
        {countries.map((country) => {
          return (
            <CountryPreview
              key={country._id}
              onClickCountryPreview={() =>
                navigate(`/profile/${profile._id}/${country._id}`)
              }
              country={country}
            />
          );
        })}
        <AddCountryButton profileId={profile._id} />
      </div>
      <button
        className="nav-btn right"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount;
        }}
      >
        <FiChevronRight />
      </button>
    </section>
  );
}
