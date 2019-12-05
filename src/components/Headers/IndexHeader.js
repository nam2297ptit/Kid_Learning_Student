/*eslint-disable*/
import React from "react";

// reactstrap components
import {Container} from "reactstrap";

// core components

function IndexHeader(props) {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });
    let pathname = window.location.pathname
    return (
        <>
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + (pathname === "/" ? require("assets/img/bg-student-1.jpg") : require("assets/img/bg-student-4.jpg")) + ")"
                    }}
                    ref={pageHeader}
                ></div>
                {pathname === "/" ? 
                <Container>
                    <div className="content-center brand">
                        <img
                            alt="..."
                            className="n-logo"
                            src={require("assets/img/748160.png")}
                        ></img>
                        <h1 className="h1-seo">
                           Quiz for Students
                        </h1>
                        <h3>
                            {props.children}
                        </h3>
                    </div>
                </Container>
                :
                <Container>
                    {props.children}
                </Container>
                }
            </div>
        </>
    );
}

export default IndexHeader;
