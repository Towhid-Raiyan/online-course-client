import React, { useContext } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { PiCalendarCheckBold } from "react-icons/pi";
import { BsBuildingGear, BsFillHouseAddFill } from "react-icons/bs";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../pages/Provider/AuthProvider";

import { motion } from "framer-motion";
import { fadeIn } from "../../hook/animationVariants";

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        const res = logOut();
        toast.success(res);
        navigate("/login");
    };

    const navOptions = (
        <>
            {/* house owner */}
            {console.log(user?.role)}
            {user?.role === "Instructor" ? (
                <>
                    {" "}
                    <li>
                        <NavLink to="home">
                            <BsBuildingGear></BsBuildingGear> Control Panel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="addCourse">
                            <BsFillHouseAddFill></BsFillHouseAddFill> Add house
                        </NavLink>
                    </li>
                </>
            ) : (
                <></>
            )}
            {user?.role === "Learner" ? (
                <>
                    {" "}
                    <li>
                        <NavLink to="manageCourse">
                            <PiCalendarCheckBold></PiCalendarCheckBold> Manage
                            Course
                        </NavLink>
                    </li>
                </>
            ) : (
                <></>
            )}
        </>
    );
    return (
        <div className="drawer lg:drawer-open ">
            <ToastContainer></ToastContainer>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <motion.div
                variants={fadeIn("down", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.1 }}
                className="drawer-content "
            >
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                ></label>
                {/* Page content here */}
                <Outlet></Outlet>
            </motion.div>
            <motion.div
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className="drawer-side "
            >
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-teal-600  text-white text-lg">
                    <h2 className="text-center text-sm">Welcome to</h2>
                    <h2 className="text-center text-2xl">Online School</h2>
                    <div className="divider "></div>
                    {/* Sidebar content here */}
                    {navOptions}
                    <div className="divider "></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome> Home Page
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <button onClick={handleLogout}>
                                <FaSignOutAlt></FaSignOutAlt> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </motion.div>
        </div>
    );
};

export default Dashboard;
