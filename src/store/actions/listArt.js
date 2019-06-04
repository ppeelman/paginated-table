import * as actionTypes from "./actionTypes.js";

export const listArtStart = () => {
  return {
    type: actionTypes.LIST_ART_START
  };
};
export const listArtSuccess = artList => {
  return {
    type: actionTypes.LIST_ART_SUCCESS,
    artList
  };
};

export const listArtFail = () => {};

export const listArt = () => {
  return dispatch => {
    dispatch(listArtStart());

    // Query parameters
    const API_KEY = "7oyCH049";
    const langCode = "en"; // Other option is "nl" for Dutch
    const url = `https://www.rijksmuseum.nl/api/${langCode}/collection?key=${API_KEY}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.artObjects.map(artObject => {
          // Take the fields that are of interest to us using Object destructuring
          const {
            objectNumber,
            title,
            principalOrFirstMaker,
            webImage
          } = artObject;

          return {
            objectNumber,
            title,
            artist: principalOrFirstMaker,

            // Slightly change the URL to get a smaller image from googleusercontent
            // https://sites.google.com/site/picasaresources/Home/Picasa-FAQ/google-photos-1/how-to/how-to-get-a-direct-link-to-an-image
            preview: webImage.url.replace("s0", "s50")
          };
        });
      })
      .then(artList => dispatch(listArtSuccess(artList)));
  };
};
