import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";
import { Settings, User } from "react-feather";
const utils = require("../../utils/LocalStorage")

function IndexNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  function hanleLogout() {
    localStorage.clear();
  }
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/"
              id="navbar-brand"
            >
              Home Page
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Home Page
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              {props.page === 'landing' 
              ? 
              <>
              <NavItem>
                <NavLink href="/auth/auth#login">
                  <b>Sign In</b>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/auth/auth#register" >
                  <b>Sign Up</b>
                </NavLink>
              </NavItem>
              </>
              :
              props.page === 'dashboard'
              ?
              <>
              <UncontrolledDropdown nav inNavbar>
                <span className="d-inline-block d-sm-none">
                    <DropdownToggle nav caret>
                        <Settings size={18} className="align-middle" />
                    </DropdownToggle>
                </span>
                <span className="d-none d-sm-inline-block">
                    <DropdownToggle nav caret>
                        <img src="https://cdn2.iconfinder.com/data/icons/avatar-profile/449/avatar_user_default_contact_profile_male-512.png" className="avatar img-fluid rounded-circle mr-1" width={30} alt="Avatar" />
                        <span className="text-white">
                          {utils.getInfo().fullName ? utils.getInfo().fullName : "Your name"}
                        </span>
                    </DropdownToggle>
                </span>
                <DropdownMenu right>
                    <Link to="#" className="text-dark">
                        <DropdownItem>
                            <User size={18} className="align-middle mr-2" />
                            Profile
                        </DropdownItem>
                    </Link>
                    <Link to="/auth/auth#login" className="text-dark">
                        <DropdownItem onClick={hanleLogout.bind(this)}>Sign out</DropdownItem>
                    </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              </>
              :
              null
              }

              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Components</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    All components
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Documentation
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
