import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function AddCountryButton({ profileId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/profile/${profileId}/add-country`)}
      title="Add new destination"
      className="add-country-button"
    >
      <BsPlusLg />
    </button>
  );
}
