import * as actionTypes from "../actions/actionTypes";

const initialState = {
  artList: [],
  error: null,
  loading: false
};

const listArtStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const listArtSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    artList: action.artList
  };
};

const listArtFail = (state, action) => {
  return {};
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_ART_START:
      return listArtStart(state, action);
    case actionTypes.LIST_ART_SUCCESS:
      return listArtSuccess(state, action);
    case actionTypes.LIST_ART_FAIL:
      return listArtFail(state, action);
    default:
      return state;
  }
};

export default reducer;
