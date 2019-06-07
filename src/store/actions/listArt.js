import * as actionTypes from "./actionTypes.js";

export const listArtStart = () => {
  return {
    type: actionTypes.LIST_ART_START
  };
};
export const listArtSuccess = artList => {
  return {
    type: actionTypes.LIST_ART_SUCCESS,
    artList: artList
  };
};

export const listArtFail = error => {
  return {
    type: actionTypes.LIST_ART_FAIL,
    error
  };
};

export const changePage = newPage => {
  return {
    type: actionTypes.CHANGE_PAGE,
    newPage
  };
};

export const listArt = (
  pageNumber,
  numberOfResultsPerPage = 10,
  pagesToFetch
) => {
  return dispatch => {
    dispatch(listArtStart());

    /* Query parameters *\ 
    \* ---------------- */
    const API_KEY = "7oyCH049";
    const langCode = "en"; // Other option is "nl" for Dutch
    const numberOfResultsToFetch = numberOfResultsPerPage * pagesToFetch;
    // We increment the pageNumber with 1 because the Rijksmuseum API starts counting at 1, not 0
    const apiPageNumber = pageNumber / pagesToFetch + 1;

    const url = `https://www.rijksmuseum.nl/api/${langCode}/collection?key=${API_KEY}&format=json&ps=${numberOfResultsToFetch}&p=${apiPageNumber}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.artObjects.map((artObject, index) => {
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
            preview: webImage
              ? webImage.url
                ? webImage.url.replace("s0", "s50")
                : null
              : null
          };
        });
      })
      .then(artList => {
        let artObjList = {};

        for (let i = 0; i < pagesToFetch; i++) {
          const startIndex = i * numberOfResultsPerPage;
          const endIndex = (i + 1) * numberOfResultsPerPage - 1;

          artObjList = Object.assign(artObjList, {
            [i + pageNumber]: artList.slice(startIndex, endIndex)
          });
        }

        return artObjList;
      })
      .then(artList => {
        dispatch(listArtSuccess(artList));
      })
      .catch(error => dispatch(listArtFail(error)));
  };
};
