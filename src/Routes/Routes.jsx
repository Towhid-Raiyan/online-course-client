import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LandingPage from "../pages/Home/LandingPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Home from "../pages/Dashboard/Instructor/Home";
import AddCourse from "../pages/Dashboard/Instructor/AddCourse";
import ManageBookings from "../pages/Dashboard/Learner/ManageBookings";

export const router = createBrowserRouter([
  {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
          {
              path:'/',
              element: <LandingPage></LandingPage>
          },
          {
              path: "login",
              element: <Login />,
          },
          {
              path: "register",
              element: <Register />,
          }
      ],
  },
  {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
          {
              path: "home",
              element: <Home></Home>,
          },
          {
              path: "addCourse",
              element: <AddCourse></AddCourse>,
          },
      ],
  },
  {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
          {
              path: "managebookings",
              element: <ManageBookings></ManageBookings>,
          },
      ],
  },
]);