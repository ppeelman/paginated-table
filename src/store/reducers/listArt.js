import * as actionTypes from "../actions/actionTypes";

const initialState = {
  artList: {},
  error: null,
  loading: false,
  currentPage: 0
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
    artList: Object.assign(state.artList, action.artList),
    error: null
  };
};

const listArtFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const changePage = (state, action) => {
  return {
    ...state,
    currentPage: action.newPage
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_ART_START:
      return listArtStart(state, action);
    case actionTypes.LIST_ART_SUCCESS:
      return listArtSuccess(state, action);
    case actionTypes.LIST_ART_FAIL:
      return listArtFail(state, action);
    case actionTypes.CHANGE_PAGE:
      return changePage(state, action);
    default:
      return state;
  }
};

export default reducer;
