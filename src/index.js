import React from "react";
import ReactDOM from "react-dom";
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import App from "./App";

ReactDOM.render(
    <App/>,
    document.getElementById("root")

// ReactDOM.render(
//     <BrowserRouter>
//         <Switch>
//             <Switch>
//                 <Route path="/index" render={props => <Index {...props} />}/>
//                 <Route
//                     path="/nucleo-icons"
//                     render={props => <NucleoIcons {...props} />}
//                 />
//                 <Route
//                     path="/landing-page"
//                     render={props => <LandingPage {...props} />}
//                 />
//                 <Route
//                     path="/profile-page"
//                     render={props => <ProfilePage {...props} />}
//                 />
//                 <Route path="/login-page" render={props => <LoginPage {...props} />}/>
//                 <Redirect to="/index"/>
//                 <Redirect from="/" to="/index"/>
//             </Switch>
//         </Switch>
//     </BrowserRouter>,
//     document.getElementById("root")
);
