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

export const listArtFail = error => {
  return {
    type: actionTypes.LIST_ART_FAIL,
    error
  };
};

export const listArt = (pageNumber, numberOfResultsPerPage = 10) => {
  return dispatch => {
    dispatch(listArtStart());

    /* Query parameters *\ 
    \* ---------------- */
    const API_KEY = "7oyCH049";
    const langCode = "en"; // Other option is "nl" for Dutch
    // We increment the pageNumber with 1 because the Rijksmuseum API starts counting at 1, not 0
    const apiPageNumber = pageNumber + 1;

    const url = `https://www.rijksmuseum.nl/api/${langCode}/collection?key=${API_KEY}&format=json&ps=${numberOfResultsPerPage}&p=${apiPageNumber}`;

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
            pageNumber,
            objectNumber,
            title,
            artist: principalOrFirstMaker,

            // Slightly change the URL to get a smaller image from googleusercontent
            // https://sites.google.com/site/picasaresources/Home/Picasa-FAQ/google-photos-1/how-to/how-to-get-a-direct-link-to-an-image
            preview: webImage.url ? webImage.url.replace("s0", "s50") : null
          };
        });
      })
      .then(artList => dispatch(listArtSuccess(artList)))
      .catch(error => dispatch(listArtFail(error)));
  };
};
