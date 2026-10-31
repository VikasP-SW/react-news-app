import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
const navColors = {
    home: "#fc0037",          // Soft white (clean & minimal look)
    business: "#6783e6",      // Deep blue (professional finance/business tone)
    entertainment: "#ed3b74", // Deep red (bold entertainment vibe)
    general: "#ad4c97",       // Warm amber (neutral news category)
    health: "#2dff0d",        // Bright green (health / positivity feel)
    science: "#87ff0f",       // Lime green (fresh scientific feel)
    sports: "#ff0f5b",       // Strong red (energy & sports intensity)
    technology: "#ff430f"    // Tech orange (modern innovation tone)
};
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                <div className="container-fluid">

                    <Link className="navbar-brand logo" to="/">
                        <span className="vikas-nav">Vikas </span>
                        <span className="news-nav">News</span>
                        <span className="hub-nav">Hub</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.home }} to="/">
                                    Home
                                </Link>
                            </li>

                            <Link
                                className="nav-link"
                                style={{ color: navColors.business }}
                                to="/business"
                            >
                                Business
                            </Link>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.entertainment }} to="/entertainment">
                                    Entertainment
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.general }} to="/general">
                                    General
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.health }} to="/health">
                                    Health
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.science }} to="/science">
                                    Science
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.sports }} to="/sports">
                                    Sports
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: navColors.technology }} to="/technology">
                                    Technology
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;