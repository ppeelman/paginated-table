import reducer from "./artDetail";
import * as actionTypes from "../actions/actionTypes";

describe("artDetail reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      artDetail: {},
      error: null,
      loading: false
    });
  });

  it("should add the details for an artpiece to the state", () => {
    const initialState = {
      artDetail: {},
      error: null,
      loading: true
    };

    const artDetailMock = {
      objectNumber: "BK-AM-33",
      artist: "Jan Borman",
      title: "Weepers from the tomb of Isabella of Bourbon"
    };

    expect(
      reducer(initialState, {
        type: actionTypes.GET_ART_DETAIL_SUCCESS,
        artDetail: artDetailMock
      })
    ).toEqual({
      artDetail: {
        "BK-AM-33": {
          objectNumber: "BK-AM-33",
          artist: "Jan Borman",
          title: "Weepers from the tomb of Isabella of Bourbon"
        }
      },
      error: null,
      loading: false
    });
  });
});
