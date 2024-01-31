import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Container from "../../../Layout/Container/Container";
import { MdSpaceDashboard } from "react-icons/md";
import { PiNewspaperClipping } from "react-icons/pi";
import { toast } from "react-toastify";

import logo from "../../../assets/logo/logo2.png";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        const res = logOut();
        toast.success(res);
        navigate("/login");
    };
    const navOptions = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "navbar-active" : "navbar-not-active"
                    }
                >
                    <FaHome />
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                {user ? (
                    <NavLink
                        to={
                            user?.role === "Learner"
                                ? "/dashboard/managebookings"
                                : "/dashboard/home"
                        }
                        className={({ isActive }) =>
                            isActive ? "navbar-active" : "navbar-not-active"
                        }
                    >
                        <MdSpaceDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
            <li>
                <NavLink
                    to="about"
                    className={({ isActive }) =>
                        isActive ? "navbar-active" : "navbar-not-active"
                    }
                >
                    <PiNewspaperClipping />
                    <span>About Us</span>
                </NavLink>
            </li>
        </>
    );
    return (
        <Container>
            <div className="navbar border-b-[1px] ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="w-12">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navOptions}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <button
                                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="login">
                            <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
