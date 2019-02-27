import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Link from "next/link";
import { FaRegSun, FaRegHandPeace, FaUserCircle, FaGrav } from "react-icons/fa";
import { logout } from "../../services/authService";
import Avatar from "../avatar";
import config from "../../config.json";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = e => {
    e.preventDefault();
    logout();
  };

  getNavs = () => {
    const { hasToken } = this.props;

    if (hasToken) {
      return (
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle
              className="px-0 py-0"
              caret
              style={{ border: "1px solid white" }}
            >
              <div style={{ display: "flex", height: "15px" }} className="px-2">
                <Avatar size="sm" />
                <span className="ml-2">tropicalMango34</span>
              </div>
            </DropdownToggle>
            <DropdownMenu right className="gradient-black">
              <DropdownItem className="gradient-black">
                <NavItem>
                  <Link href="/profile">
                    <a className="f3 fw6">
                      <FaUserCircle size={16} className="mr-3 mb-1" /> Profile
                    </a>
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem className="gradient-black">
                <NavItem>
                  <Link href="/settings">
                    <a className="f3 fw6">
                      <FaRegSun size={16} className="mr-3 mb-1" /> Settings
                    </a>
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem className="gradient-black">
                <NavItem>
                  <Link href="">
                    <a className="f3 fw6" onClick={e => this.handleLogout(e)}>
                      <FaRegHandPeace size={16} className="mr-3 mb-1" /> Logout
                    </a>
                  </Link>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link href="/login">
              <a className="f3 fw6">Login</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="/signup">
              <a className="f3 fw6">Sign Up</a>
            </Link>
          </NavItem>
        </Nav>
      );
    }
  };

  render() {
    return (
      <Navbar id="navbar-main" dark expand="sm" fixed="top" className="px-4">
        <Link href="/">
          <a
            className="navbar-brand pull-left"
            title="NextTrek Home"
            className="f4 fw6"
          >
            TrekNext
            <FaGrav size={32} className="mx-2" />
          </a>
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {this.getNavs()}
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
