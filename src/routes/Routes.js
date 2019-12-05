import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {
    auth as authRoutes,
    landing as landingRoutes,
    dashboard as dashBoardRoutes,
    quiz as quizRoutes,
} from "./index";

import DashboardLayout from "../components/Layouts/DashboardLayout";
import AuthLayout from "../components/Layouts/AuthLayout";
import LandingLayout from "../components/Layouts/LandingLayout"
import Page404 from "../pages/Auth/Page404"

import utils from "../utils";
import QuizLayout from "components/Layouts/QuizLayout";

const childRoutes = (Layout, routes) =>
    routes.map(({children, path, component: Component}, index) =>
        children ? (
            // Route item with children
            children.map(({path, component: Component}, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                exact
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );


class Routes extends React.Component {
    render() {
        let token = utils.LocalStorage.getToken();
        return (
            <Router>
                <Switch>
                    {childRoutes(LandingLayout, landingRoutes)}
                    {childRoutes(AuthLayout, authRoutes)}
                    {token
                            ?
                            <>
                                {childRoutes(DashboardLayout, dashBoardRoutes)}
                                {childRoutes(QuizLayout, quizRoutes)}
                                {(window.location.pathname !== '/dashboard' && window.location.pathname !== '/courses') && <Page404/>}
                            </>
                            :
                            <>
                                <Redirect to="/auth/auth#login"/>
                            </>
                    }
                    
                </Switch>
            </Router>
        )
    }
}

export default Routes;
