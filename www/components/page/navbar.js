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
import { FaGrav } from "react-icons/fa";
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

  render() {
    return (
      <Navbar
        id="navbar-main"
        color="dark"
        dark
        expand="sm"
        fixed="top"
        className="px-4"
      >
        <Link href="/">
          <a
            className="navbar-brand pull-left"
            title="NextTrek Home"
            className="f3 fw5"
          >
            {config.brandName} <FaGrav size={32} className="mx-2" />
          </a>
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
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
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
