import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import animationData from "../../assets/lottie/login.json";
import Lottie from "react-lottie";
import { useForm } from "react-hook-form";
import { Link, Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const { user, loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => handleLogin(data);

    if (user) {
        toast.success("Already logged in")
        navigate("/");
    }
    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            // Call the loginUser function to perform the login
            const response = await loginUser(email, password);

            toast.success("Login successful");
            reset(); // Reset the form fields

            if (response?.role === "Instructor") {
                navigate("/dashboard/managebookings");
            } else {
                navigate("/dashboard/home");
            }

            console.log();
        } catch (error) {
            console.error("Error during user login:", error);
            toast.error("Error logging in. Please try again later.");
        }
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div>
            <ToastContainer />
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse gap-1 md:gap-16">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-btn text-[#00897b] text-center ">
                            Login Now
                        </h1>
                        <div>
                            <Lottie
                                options={defaultOptions}
                                // height={400}
                                // width={400}
                                className="w-[400px]"
                            />
                        </div>
                    </div>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 "
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <p className="text-md">
                                New here? Please{" "}
                                <Link
                                    to={"/register"}
                                    className="text-indigo-500"
                                >
                                    Register here
                                </Link>
                            </p>
                            <div className="text-center">
                                {status ? (
                                    <p className="text-teal-600">{status}</p>
                                ) : (
                                    <></>
                                )}
                                {error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="form-control mt-2">
                                <input
                                    className="btn bg-[#00897b] text-white hover:bg-[#0f4741]"
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
