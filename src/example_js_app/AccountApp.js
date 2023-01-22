import ReactDOM from "react-dom";
import React, {useState, Fragment, useEffect, useRef} from "react";

import Waiting from "./reusables/Waiting";
import Alert from "./reusables/Alert";
import {handleClickOutside} from "./reusables/utils";

// import NotificationsApp from "../../src/core/NotificationsApp";

async function dummyPost(url) {
    return setTimeout(() => {
        console.log("posting", url)
        return {ok: true};
    }, 5000);
}

function NavbarProfileApp() {
    const [state, setState] = useState({
        authenticated: true,
        waiting: false,
        error: false,
        menu_open: false,
        menu_open_add: false,
    });
    const [notifications, setNotifications] = useState(null);
    const wrapperRef = useRef(null);

    //not working, must fix it
    handleClickOutside(wrapperRef, close);

    function close(e) {
        e.preventDefault();
        setState({...state, menu_open: false})
    }

    function logout(e) {
        e.preventDefault();
        dummyPost("logout").then(response => {
            if (response.ok) {
                console.log('logout ok');
                setState({...state, menu_open: false, authenticated: false})
            } else {
                console.log('logout not ok')
                setState({...state, error: response.statusText, menu_open: false});
            }
        });
    }


    const dropdownProfileMenu = () => (
        <div className="dropdown-menu dropdown-menu-account">
            <div className="profile">
                <span className="dropdown-button-icon icon-person-circle"/>
                <div>
                    <a rel="nofollow noopener" href="#">My Profile</a>
                </div>
            </div>
            <div className="other-menu-items">
                {notifications}
                <a rel="nofollow noopener" href="#"><span className="icon-plus"></span> Subscriptions</a>
                <a rel="nofollow noopener" href="#"><span className="icon-plus"></span> My Collections</a>
                <a rel="nofollow noopener" onClick={logout} className="signout_button">Sign Out</a>
            </div>
        </div>
    )

    if (state.error) return (<Alert text={state.error}/>);
    if (state.waiting) return (<Waiting text="..."/>);
    if (!state.authenticated) return (<a href="#" className="btn primary">Login</a>);

    return (
        <Fragment>
            <div className="dropdown">
                    <span className="dropdown-button"
                          onClick={e => {
                              if (e.target.className.split(' ').indexOf('modal') > -1) return null;
                              setState({...state, menu_open: state.menu_open === 'profile' ? false : 'profile'});
                          }}>
                        <span className="dropdown-button-icon icon-person-circle"/>
                    </span>
                {state.menu_open === 'profile' ? dropdownProfileMenu() : ''}
            </div>
        </Fragment>
    )
}

ReactDOM.render(<NavbarProfileApp/>, document.getElementById("profile-app"));
