import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Avatar from "../../components/avatar";

describe("Avatar", () => {
  it("renders without crashing", () => {
    const av = shallow(<Avatar size="sm" />);
    expect(av.find("div").hasClass("avatar-sm")).toEqual(true);
  });
});
