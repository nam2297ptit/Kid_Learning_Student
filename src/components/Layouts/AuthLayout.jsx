import React, { Component } from 'react';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import utils from "../../utils";
import {BrowserRouter as Redirect} from "react-router-dom";

class AuthLayout extends Component {
    componentWillMount(){
        let token = utils.LocalStorage.getToken();
        if(token) window.location.replace('/dashboard')
    }
    render() {
        let token = utils.LocalStorage.getToken();
        return (
            <React.Fragment>
                { token
                ? 
                    <Redirect to="/dashboard"/>
                :
                    <div className="login-page sidebar-collapse index-page">
                        <IndexNavbar/>
                        <div className="wrapper">
                            {this.props.children}
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default AuthLayout;