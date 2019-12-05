import React, { Component } from 'react';
import IndexHeader from "../../components/Headers/IndexHeader.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import utils from "../../utils";
import {BrowserRouter as Redirect} from "react-router-dom";

class LandingLayout extends Component {
    componentDidMount(){
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
                    <div className="index-page sidebar-collapse">
                        <IndexNavbar page="landing"/>
                        <div className="wrapper">
                            <IndexHeader/>
                            {this.props.children}
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default LandingLayout;