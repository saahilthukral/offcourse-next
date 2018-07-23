import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { Group, Bar } from "@offcourse/atoms";
import {
  NavBar,
  MessageGroup,
  Menu,
  Sidebar as Layout
} from "@offcourse/molecules";

export default class AppShell extends Component {
  static propTypes = {
    /** array of objects that define the links in the menu */
    links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        onClick: PropTypes.func,
        href: PropTypes.string
      })
    ),
    /** array of objects that the messages in the bar */
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        variant: PropTypes.oneOf([
          "default",
          "error",
          "info",
          "success",
          "warning"
        ])
      })
    ),
    /** function that triggers the sidebar to open or close */
    toggleSidebar: PropTypes.func,
    /** flag that determines whether the sidebar is open or closed */
    isSidebarOpen: PropTypes.bool,
    /** determines the position of the navbar. This is mainly for debugging...*/
    position: PropTypes.oneOf(["fixed", "absolute"])
  };

  static defaultProps = {
    isSidebarOpen: false
  };

  renderNavBar = () => {
    const {
      links,
      onLogoClick,
      messages,
      toggleSidebar,
      position
    } = this.props;
    return (
      <NavBar
        onLogoClick={onLogoClick}
        messages={messages}
        onMenuButtonClick={toggleSidebar}
        links={links}
        position={position}
      />
    );
  };

  renderSidebar = () => {
    const { links } = this.props;
    return <Menu links={links} />;
  };

  renderMain = () => {
    const { children, messages } = this.props;
    const hasMessages = messages && !isEmpty(messages);
    console.log(hasMessages);
    return (
      <Group mt={hasMessages ? `${messages.length * 2 + 2}rem` : 8}>
        {children}
      </Group>
    );
  };

  render() {
    const { isSidebarOpen, messages, toggleSidebar } = this.props;

    return (
      <Layout
        content={this.renderSidebar()}
        toggle={toggleSidebar}
        isOpen={isSidebarOpen}
      >
        {this.renderNavBar()}
        {this.renderMain()}
      </Layout>
    );
  }
}
