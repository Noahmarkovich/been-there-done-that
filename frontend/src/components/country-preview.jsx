export function CountryPreview({ country, onClickCountryPreview }) {
  return (
    <div onClick={onClickCountryPreview} className="country-preview">
      <img src={country.imgUrl} alt="country-img" />
      <div className="country-title">{country.country}</div>
    </div>
  );
}
