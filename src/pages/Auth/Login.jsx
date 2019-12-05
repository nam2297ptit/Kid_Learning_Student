import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  Container,
  Col,
  Alert,
  FormGroup,
  FormFeedback
} from "reactstrap";
import './auth.css'
const api = require("./api/api");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFocus: false,
      passwordFocus: false,
      changeUsername: null,
      changePassword: null,
      error: '',
      submitted: false
    }
    this.changeFocusTrue = this.changeFocusTrue.bind(this)
    this.changeFocusFalse = this.changeFocusFalse.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
  }
  
  componentWillMount() {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  componentWillUnmount(){
    document.body.classList.remove("login-page");
    document.body.classList.remove("sidebar-collapse");
  }
  changeFocusTrue(event){
    this.setState({
      [event.target.name]: true
    });
  }
  changeFocusFalse(event){
    this.setState({
      [event.target.name]: false
    });
  }
  handleChangeValue(event) {
    let value = event.target.value
    if (value === "") value = null
    this.setState({
        [event.target.id]: value
    });
  }
  submitLogin(event){
    event.preventDefault();
    this.setState({ submitted: true });
    let {changeUsername, changePassword} = this.state
    if(!changeUsername) return
    if(!/(?=^.{6,}$).*$/i.test(changePassword)) return          //password must contain at least 8 or more characters
    else{
      api.login({userName: changeUsername, password: changePassword},(err,result) => {
        if(err){
          console.log(err)
          this.setState({ error: err.data === undefined ? err : err.data._error_message})
        }
        else{
          console.log(result)
          let user = {
            avatar: result.avatar,
            class: result.class,
            fullName: result.fullName,
            gender: result.gender,
            school: result.school,
            userName: result.userName,
            error: '',
            submitted: false,       //check form is invalid
          }
          localStorage.setItem('token',result.authToken)
          localStorage.setItem('user',JSON.stringify(user))
          window.location.replace('/dashboard')
        }
      })
    }
  }


  render() {
  let {error, changeUsername, changePassword, usernameFocus, passwordFocus, submitted} = this.state
  return (
    <React.Fragment>
      <Container>
        <Col className="ml-auto mr-auto" lg="4">
          <Card className="card-login card-plain">
            <Form onSubmit={this.submitLogin.bind(this)} className="form" >
              <CardHeader className="text-center">
                <div className="logo-container mb-0">
                  <img
                    alt="..."
                    src={require("assets/img/748160.png")}
                  ></img>
                  <b>Login</b>
                </div>
              </CardHeader>
              {error &&
                  <Alert color="danger" className="p-1 mt-1 auth-alert-form" >{error}</Alert>
              }
              <CardBody>
                <FormGroup className={"no-border input-lg" + (usernameFocus ? " input-group-focus" : "")}>
                  {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon> */}
                  <Input
                    placeholder="Username..."
                    name="usernameFocus"
                    id="changeUsername"
                    type="text"
                    onFocus={this.changeFocusTrue}
                    onBlur={this.changeFocusFalse}
                    onChange={this.handleChangeValue}
                    invalid={submitted && changeUsername === null ? true : false}
                  />
                  <FormFeedback invalid>Username is a required field!</FormFeedback>
                </FormGroup>
                <FormGroup className={"no-border input-lg" + (passwordFocus ? " input-group-focus" : "")}>
                  {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons text_caps-small"></i>
                    </InputGroupText>
                  </InputGroupAddon> */}
                  <Input
                    placeholder="Password..."
                    name="passwordFocus"
                    id="changePassword"
                    type="password"
                    onFocus={this.changeFocusTrue}
                    onBlur={this.changeFocusFalse}
                    onChange={this.handleChangeValue}
                    require
                    invalid={submitted && (!/(?=^.{6,}$).*$/i.test(changePassword)) ? true : false}
                  />
                  <FormFeedback invalid> Password must contain at least 6 or more characters</FormFeedback>
                </FormGroup>
              </CardBody>
              
              <CardFooter className="text-center">
                <Button
                  type="submit"
                  block
                  className="btn-round"
                  color="info"
                  size="lg"
                >
                    Login
                </Button>
                <div className="pull-left">
                  <h6 >
                    <a className="link" href="#register">
                      Create Account
                    </a>
                  </h6>
                </div>
                <div className="pull-right">
                  <h6>
                    <a className="link" href="!#" onClick={e => e.preventDefault()}>
                      Need Help?
                    </a>
                  </h6>
                </div>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Container>
    </React.Fragment>
  );
  }
}

export default Login;