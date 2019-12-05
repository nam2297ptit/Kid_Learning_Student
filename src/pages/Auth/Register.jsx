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
const api = require("./api/api");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFocus: false,
      passwordFocus: false,
      repassFocus: false,
      fullnameFocus: false,
      // emailFocus: false,
      changeUsername: null,
      changePassword: null,
      changeRepassword: null,
      changeFullname: null,
      changeEmail: null,
      error: '',
      success: '',
      submitted: false,       //check form is invalid
    }
    this.changeFocusTrue = this.changeFocusTrue.bind(this)
    this.changeFocusFalse = this.changeFocusFalse.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
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
  submitRegister(event){
    event.preventDefault();
    this.setState({ submitted: true });
    let {changeUsername, changePassword, changeRepassword, changeFullname} = this.state
    if(!(changeUsername && changeFullname)) return
    if ((!/(?=^.{6,}$).*$/i.test(changePassword)) || (changePassword !== changeRepassword)) {
        return;
    }
    else{
      api.register({userName: changeUsername, password: changePassword, fullName: changeFullname},(err,result) => {
        if(err){
          this.setState({ error: err.data === undefined ? err : err.data._error_message})
        }
        else{
          console.log(result)
          this.setState({ success: result._created_message})
        }
      })
    }
  }


  render() {
    var {
      usernameFocus,  passwordFocus, repassFocus, fullnameFocus, 
      // emailFocus, 
      changeUsername, changePassword, changeRepassword, changeFullname, 
      // changeEmail,
      submitted, error, success
    } = this.state
  return (
    <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={this.submitRegister.bind(this)} className="form">
                  <CardHeader className="text-center">
                    <div className="logo-container mb-0">
                      <img
                        alt="..."
                        src={require("assets/img/748160.png")}
                      ></img>
                      <b>Register</b>
                    </div>
                  </CardHeader>
                  {success &&
                      <Alert className="p-1 mt-1 auth-alert-form" color="success">{success}</Alert>
                  }      
                  {error &&
                      <Alert className="p-1 mt-1 auth-alert-form" color="danger" isOpen={success ? false: true}>{error}</Alert>
                  }
                  <CardBody>
                    <FormGroup
                      className={"no-border input-lg" + (usernameFocus ? " input-group-focus" : "")}>
                      <Input
                        placeholder="Username..."
                        name="usernameFocus"
                        id="changeUsername"
                        type="text"
                        onFocus={this.changeFocusTrue}
                        onBlur={this.changeFocusFalse}
                        onChange={this.handleChangeValue}
                        invalid={submitted && changeUsername === null ? true : false}
                      ></Input>
                      <FormFeedback invalid>Username is a required field!</FormFeedback>
                    </FormGroup>

                    <FormGroup
                      className={"no-border input-lg" + (passwordFocus ? " input-group-focus" : "")}>
                      <Input
                        placeholder="Password..."
                        name="passwordFocus"
                        id="changePassword"
                        type="password"
                        onFocus={this.changeFocusTrue}
                        onBlur={this.changeFocusFalse}
                        onChange={this.handleChangeValue}
                        invalid={submitted && (!/(?=^.{6,}$).*$/i.test(changePassword)) ? true : false}
                      ></Input>
                      <FormFeedback invalid>Password must contain at least 6 or more characters</FormFeedback>
                    </FormGroup>

                    <FormGroup
                      className={"no-border input-lg" + (repassFocus ? " input-group-focus" : "")}>
                      <Input
                        placeholder="Repassword..."
                        name="repassFocus"
                        id="changeRepassword"
                        type="password"
                        onFocus={this.changeFocusTrue}
                        onBlur={this.changeFocusFalse}
                        onChange={this.handleChangeValue}
                        invalid={submitted && changePassword !== changeRepassword ? true : false}
                      ></Input>
                      <FormFeedback invalid>Repassword incorrect. Please retype the password</FormFeedback>
                    </FormGroup>

                    <FormGroup
                      className={"no-border input-lg" + (fullnameFocus ? " input-group-focus" : "")}>
                      <Input
                        placeholder="Fullname..."
                        name="fullnameFocus"
                        id="changeFullname"
                        type="text"
                        onFocus={this.changeFocusTrue}
                        onBlur={this.changeFocusFalse}
                        onChange={this.handleChangeValue}
                        invalid={submitted && changeFullname === null ? true : false}
                      ></Input>
                      <FormFeedback invalid>Fullname is a required field!</FormFeedback>
                    </FormGroup>

                    {/* <FormGroup
                      className={"no-border input-lg" + (emailFocus ? " input-group-focus" : "")}>
                      <Input
                        placeholder="Email..."
                        name="emailFocus"
                        id="changeEmail"
                        type="email"
                        onFocus={this.changeFocusTrue}
                        onBlur={this.changeFocusFalse}
                        onChange={this.handleChangeValue}
                        invalid={submitted && changeEmail === null ? true : false}
                      />
                      <FormFeedback invalid>Email is a required field!</FormFeedback>
                    </FormGroup> */}

                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      type="submit"
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                    >
                      Register
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a className="link" href="#login">
                          Already have an account
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
        </div>
    </>
  );
          }
}

export default Register;