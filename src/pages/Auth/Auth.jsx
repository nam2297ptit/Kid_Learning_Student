import React from "react";

// reactstrap components
import {
  Container,
} from "reactstrap";

// core components
import TransparentFooter from "components/Footers/TransparentFooter.js";
import Login from "./Login"
import Register from "./Register"

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true
    }
  }
  render() {
      let hash = window.location.hash
  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg-student-1.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            {hash === '#login' ? <Login/> : hash === '#register' ? <Register/> : window.location.replace('/dashboard')}
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
          }
}

export default Auth;