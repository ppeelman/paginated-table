import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LoadResources from "./LoadResources";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

configure({ adapter: new Adapter() });

describe("<LoadResources />", () => {
  it("should render a loading indicator when it gets a loading prop", () => {
    const props = {
      loading: true
    };

    const wrapper = shallow(<LoadResources {...props} />);

    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });
  it("should render an error message when it gets an error object as prop", () => {
    const props = {
      error: { message: "Error!" }
    };

    const wrapper = shallow(<LoadResources {...props} />);

    expect(wrapper.find(Snackbar)).toHaveLength(1);
  });
});
