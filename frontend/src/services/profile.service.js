import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const STORAGE_KEY = "profile";

_createProfiles();
export const profileService = {
  query,
  getById,
  save,
  getEmptyCountry,
  saveCountry,
  getCountryById,
};
window.cs = profileService;

async function query(filterBy = { txt: "", price: 0 }) {
  var profiles = await storageService.query(STORAGE_KEY);
  return profiles;
}

function getById(profileId) {
  return storageService.get(STORAGE_KEY, profileId);
}

function getCountryById(countryId, profile) {
  const currentCountry = profile.countries.find(
    (country) => country._id === countryId
  );
  return currentCountry;
}

async function saveCountry(newCountry, profileId) {
  let profile = await getById(profileId);
  if (newCountry._id) {
    const countryIndex = profile.countries.findIndex(
      (country) => country._id === newCountry._id
    );
    profile.countries.splice(countryIndex, 1, newCountry);
  } else {
    newCountry._id = utilService.makeId();
    profile.countries.unshift(newCountry);
  }

  return save(profile);
}

async function save(profile) {
  let savedProfile;
  if (profile._id) {
    savedProfile = await storageService.put(STORAGE_KEY, profile);
  } else {
    savedProfile = await storageService.post(STORAGE_KEY, profile);
  }
  return savedProfile;
}

function getEmptyCountry() {
  return {
    _id: "",
    country: "",
    rating: "",
    description: "",
    imgUrl: "",
    insights: "",
  };
}

function _createProfiles() {
  let profiles = utilService.loadFromStorage(STORAGE_KEY);
  if (!profiles || profiles.length === 0) {
    profiles = [
      {
        _id: "p101",
        fullName: "Noah Markovich",
        userName: "Noahmarko",
        aboutMe:
          "my name is Noah I am 29 years old, I am a Junior Full Stack developer with a passion to travel around the world. I love exploring new places through my camera lens lets me tell incredible stories, and meeting locals adds a whole extra layer of adventure to my journeys. ",
        address: "Tel Aviv, Israel",
        profileImg: "../assets/img/noah-profile.jpg",
        coverImg: "../assets/img/noah-cover.jpg",
        countries: [
          {
            _id: "c101",
            country: "Greece",
            rating: "4.5",
            description:
              "I love this country, it has it all- amazing food, great beaches, welcoming people and night life. the fact that it is very close to my home country makes it the most visited country I have been at. ",
            imgUrl: require("../assets/img/greece.jpg"),
            insights: "",
            categories: {
              id: "category101",
              title: "Cities I have visited",
              locations: [
                {
                  id: "l101",
                  name: "Santorini",
                  description:
                    "Santorini, a picturesque Greek island in the Aegean Sea, is renowned for its stunning sunsets, iconic blue-domed churches, and dramatic cliffside villages. Visitors are drawn to its breathtaking views and unique charm, making it a popular destination for romantic getaways and unforgettable vacations.",
                  coverImg: require("../assets/img/santorini1.jpg"),
                  gallery: [
                    {
                      id: "s101",
                      description: "The view from a top point of Fira.",
                      imgUrl: require("../assets/img/santorini1.jpg"),
                    },
                    {
                      id: "s102",
                      description:
                        "The white church that hides between the narrow streets of Fira.",
                      imgUrl: require("../assets/img/santorini2.jpg"),
                    },
                    {
                      id: "s103",
                      description:
                        "The red beach, one of the most beautiful beaches in Santorini.",
                      imgUrl: require("../assets/img/santorini3.jpg"),
                    },
                    {
                      id: "s104",
                      description:
                        "Probably the most famous sites in Santorini, the city Oia. With the blue capes houses, hotels and restaurants with sea view.  ",
                      imgUrl: require("../assets/img/santorini4.jpg"),
                    },
                    {
                      id: "s105",
                      description:
                        "One of our favorite street food of the greek cousin- Gyros. Flakes of meat- pork or chicken with greek yogurt and vegetables warped in a pita bread, amazing!  ",
                      imgUrl: require("../assets/img/santorini5.jpg"),
                    },
                  ],
                },
                {
                  id: "l102",
                  name: "Santorini",
                  description: "crete",
                  coverImg: require("../assets/img/crete.jpg"),
                },
              ],
            },
          },
          {
            _id: "c102",
            country: "Thailand",
            rating: "4.8",
            description:
              "I love this country, it has it all- amazing food, great beaches, welcoming people and night life. the fact that it is relatively affordable and offers a high level standard of living makes it one of my favorite countries. ",
            imgUrl: require("../assets/img/thailand.jpg"),
            insights: "",
          },
          {
            _id: "c103",
            country: "Cambodia",
            rating: "4.0",
            description: "Very nice ",
            imgUrl: require("../assets/img/cambodia.jpg"),
            insights: "",
          },
          {
            _id: "c104",
            country: "Vietnam",
            rating: "4.6",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in dui in enim elementum faucibus.",
            imgUrl: require("../assets/img/vietnam.jpg"),
            insights: "",
          },
          {
            _id: "c105",
            country: "India",
            rating: "4.3",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in dui in enim elementum faucibus faucibus.",
            imgUrl: require("../assets/img/india.jpg"),
            insights: "",
          },
          {
            _id: "c106",
            country: "Italy",
            rating: "4.8",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in dui in enim elementum faucibus faucibus.",
            imgUrl: require("../assets/img/italy.jpg"),
            insights: "",
          },
        ],
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, profiles);
  }
}
