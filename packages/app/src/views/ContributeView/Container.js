import React, { Component } from "react";
import { Adopt } from "react-adopt";
import View from "./View";
import { contribute } from "../../content";
console.log(contribute);

const Dummy = ({ children }) => {
  return children(contribute);
};
/* eslint: disable */
const mapper = {
  contribute: <Dummy />
};
/* eslint: enable */

const mapProps = ({ contribute }) => ({ contribute });

export default class Container extends Component {
  render() {
    const { handlers } = this.props;
    return (
      <Adopt mapper={mapper} mapProps={mapProps}>
        {props => <View handlers={handlers} {...props} />}
      </Adopt>
    );
  }
}
