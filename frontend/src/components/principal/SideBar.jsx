import Logo from "./../../assets/images/principal/logo.png";
import { FaBook ,FaUsersCog, FaUser } from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

import "./../../assets/styles/principal/sideBar.css";

function SideBar() {
    const handleToggle = () => {
        const sidebar = document.querySelector("nav");
        sidebar.classList.toggle("close");
    };

    const handleSearchClick = () => {
        const sidebar = document.querySelector("nav");
        sidebar.classList.remove("close");
    };

    return (
        <nav id="SideBar" className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={Logo} alt="Logo not found" />
                    </span>

                    <div className="text logo-text">
                        <span className="name">Rofof Library</span>
                        <span className="profession">
                            Commetee Al Masjid Library
                        </span>
                    </div>
                </div>

                <i
                    className="bx bx-chevron-right toggle"
                    onClick={handleToggle}
                >
                    <FaBook />
                </i>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box" onClick={handleSearchClick}>
                        <i className="bx bx-search icon"></i>
                        <input
                            type="text"
                            placeholder="Search your taste ..."
                        />
                    </li>

                    <ul className="menu-links">
                        <li className="nav-link">
                            <NavLink to="/">
                                <MdDashboard />
                                <span className="text nav-text">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/ourBooks">
                                <FaBook />
                                <span className="text nav-text">
                                    Book Managments
                                </span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/ourAuthors">
                                <FaUser />
                                <span className="text nav-text">
                                    Author Managments
                                </span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/userManagments">
                                <FaUsersCog />
                                <span className="text nav-text">
                                    User Managments
                                </span>
                            </NavLink>
                        </li>
                        {/* <li className="nav-link">
                            <NavLink to="/settings">
                                <IoIosSettings />
                                <span className="text nav-text">Settings</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>

                <div className="bottom-content">
                    <li className="">
                        <a href="/#">
                            <span className="text nav-text">Logout</span>
                            <IoMdLogOut />
                        </a>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default SideBar;
