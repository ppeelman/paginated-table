import * as actionTypes from "./actionTypes.js";

export const getArtDetailStart = () => {
  return {
    type: actionTypes.GET_ART_DETAIL_START
  };
};

export const getArtDetailSuccess = artDetail => {
  return {
    type: actionTypes.GET_ART_DETAIL_SUCCESS,
    artDetail
  };
};

export const getArtDetailFail = error => {
  return {
    type: actionTypes.GET_ART_DETAIL_FAIL,
    error
  };
};

export const getArtDetail = objectNumber => {
  return dispatch => {
    dispatch(getArtDetailStart());

    /* Query parameters *\ 
    \* ---------------- */
    const API_KEY = "7oyCH049";
    const langCode = "en"; // Other option is "nl" for Dutch

    const url = `https://www.rijksmuseum.nl/api/${langCode}/collection/${objectNumber}?key=${API_KEY}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const {
          objectNumber,
          title,
          principalMaker: artist,
          description,
          subTitle: detail,
          webImage: image
        } = data.artObject;

        return {
          objectNumber,
          title,
          artist,
          detail,
          description,
          image: image.url ? image.url.replace("s0", "h500") : null
        };
      })
      .then(artDetail => dispatch(getArtDetailSuccess(artDetail)))
      .catch(error => dispatch(getArtDetailFail(error)));
  };
};
