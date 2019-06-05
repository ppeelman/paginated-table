import * as actionTypes from "../actions/actionTypes";

const initialState = {
  artDetail: {},
  error: null,
  loading: false
};

const getArtDetailStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const getArtDetailSuccess = (state, action) => {
  return {
    ...state,
    artDetail: action.artDetail,
    loading: false,
    error: null
  };
};

const getArtDetailFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ART_DETAIL_START:
      return getArtDetailStart(state, action);
    case actionTypes.GET_ART_DETAIL_SUCCESS:
      return getArtDetailSuccess(state, action);
    case actionTypes.GET_ART_DETAIL_FAIL:
      return getArtDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
