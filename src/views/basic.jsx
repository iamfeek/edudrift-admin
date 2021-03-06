import React from "react";
import { Link, withRouter } from "react-router-dom";
import { SideNav, Nav } from "react-sidenav";

import MainRoute from "routes/main-route";
import EdButton from "components/EdButton";

import style from "./basic.module.scss";

import logo from "../static/images/logo.png";
import tokenHelper from "../utils/tokenHelper";

const theme = {
    selectionBgColor: "rgba(242, 153, 74, 0.2)"
};

const menus = [
    {
        key: "user",
        name: "User",
        child: [
            { key: "user-accounts", name: "User Accounts and Status" },
            { key: "client", name: "Client End Users" },
            { key: "institutional", name: "Institutional Partners" },
            { key: "competition", name: "Competition Organisers" }
        ]
    },
    {
        key: "programs",
        name: "Programs"
    },
    {
        key: "bookings",
        name: "Bookings"
    },
    {
        key: "finance",
        name: "Finance"
    }
];

const renderNav = () => {
    let arr = [];
    menus.forEach(menu => {
        let chidArr = [];

        if (menu.child) {
            menu.child.forEach(val => {
                chidArr.push(
                    <Nav key={val.key} id={val.key}>
                        <Link to={`/${val.key}`}>
                            <span>{val.name}</span>
                        </Link>
                    </Nav>
                );
            });
        }
        arr.push(
            <Nav key={menu.key} id={menu.key}>
                <span style={{ fontWeight: "bold" }}>{menu.name}</span>
                {chidArr}
            </Nav>
        );
    });
    return arr;
};

const renderBreadcrumbs = pathname => {
    const arr = [];
    const pathArr = pathname.slice(1).split("/");
    if (pathArr && Array.isArray(pathArr)) {
        let path = "";
        pathArr.forEach(val => {
            path = "/" + val;
            if (val) {
                arr.push(
                    <Link to={path}>
                        <li key={val}>
                            <span>></span>
                            {val}
                        </li>
                    </Link>
                );
            }
        });
    }
    return (
        <ul className={style.breadcrumbs}>
            <Link to="/">
                <li>Home</li>
            </Link>
            {arr}
        </ul>
    );
};

const Basic = props => {
    const { location } = props;
    const { pathname } = location;
    const token = tokenHelper.getToken();
    return (
        <React.Fragment>
            <header className={style.header}>
                <div className={style.inner}>
                    <div className={style.logo}>
                        <img src={logo} />
                    </div>
                    <div className={style.user}>
                        {token ? null : (
                            <Link to="/home">
                                <EdButton style={{ width: 120 }} size="large">
                                    SIGN IN
                                </EdButton>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <section className={style.main}>
                <div className={style.inner}>
                    <aside className={style.aside}>
                        <div className={style["aside-top"]}>
                            <SideNav theme={theme}>
                                <Nav id="home">
                                    <Link to="/">
                                        <span style={{ fontWeight: "bold" }}>
                                            Admin Home
                                        </span>
                                    </Link>
                                </Nav>
                                <Nav id="view">
                                    <Link to="/view-site">
                                        <span style={{ fontWeight: "bold" }}>
                                            View Site
                                        </span>
                                    </Link>
                                </Nav>
                            </SideNav>
                        </div>
                        <div className={style["aside-nav"]}>
                            <SideNav theme={theme}>{renderNav()}</SideNav>
                        </div>
                    </aside>
                    <div className={style.content}>
                        {renderBreadcrumbs(pathname)}
                        <MainRoute />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default withRouter(Basic);
