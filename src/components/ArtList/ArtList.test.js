import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ArtList from "./ArtList";
import TableRow from "@material-ui/core/TableRow";
import ArtListMock from "./MockData/ArtListMock";

configure({ adapter: new Adapter() });

describe("<ArtList />", () => {
  it("should render 11 <TableRow /> elements", () => {
    const props = {
      artList: ArtListMock,
      pageIndex: 0,
      rowClicked: () => {},
      paginationClicked: () => {}
    };

    const wrapper = shallow(<ArtList {...props} />);

    expect(wrapper.find(TableRow)).toHaveLength(11);
  });
});
