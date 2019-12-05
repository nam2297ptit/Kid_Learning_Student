import React from 'react';
import IndexHeader from "../../components/Headers/IndexHeader.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
function DashboardLayout(props) {
    React.useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    return (
        <React.Fragment>
            <div className="index-page sidebar-collapse">
                <IndexNavbar page="dashboard"/>
                <div className="wrapper">
                    <IndexHeader>
                        {props.children}
                    </IndexHeader>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DashboardLayout;
