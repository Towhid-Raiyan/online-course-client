import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { isValidEmail, isValidPassword } from "../Validation/validation";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import animationData from "../../assets/lottie/login.json";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
const Register = () => {
    const { registerUser, user,logOut } = useContext(AuthContext);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    if (user) {
        toast.success("Already logged in");
        const res = logOut();
        navigate("/login");
    }

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => handleRegister(data);
    const handleRegister = async (data) => {
        setStatus("");
        setError("");
        setIsLoading(true); // Set loading state to true

        const { fullName, email, password, role } = data;
        console.log(data);
        // Perform input validation
        if (!fullName || !email || !password || !role) {
            setError("Please fill in all the fields");
            setIsLoading(false); // Set loading state to false
            return;
        }
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            setIsLoading(false); // Set loading state to false
            return;
        }
        if (!isValidPassword(password)) {
            setError(
                "Invalid password. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            );
            setIsLoading(false); // Set loading state to false
            return;
        }

        try {
            // Call the registerUser function to register the user
            await registerUser(fullName, email, password, role);

            setIsLoading(false);
            reset();
            toast.success("Register Success");
            setStatus("User registered successfully");
        } catch (error) {
            console.error("Error during user registration:", error);
            setError(error.message); // Set backend error message
            setIsLoading(false);
            toast.error(error.message); // Show backend error message
        }
    };

    // Lottie animation options
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
            <ToastContainer/>
            {isLoading && (
                <div className="h-[600px] flex items-center justify-center">
                    <FadeLoader color="#36d7b7" />
                </div>
            )}

            {!isLoading && (
                <div className="hero min-h-screen bg-base-100">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-0 md:gap-16">
                        <div className="text-center">
                            <div>
                                <h1 className="text-5xl font-bold text-[#00897b]">
                                    Register now!
                                </h1>
                                <Lottie
                                    options={defaultOptions}
                                    className="w-[600px]"
                                />
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                        >
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Your name"
                                        className="input input-bordered"
                                        {...register("fullName", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Your email"
                                        className="input input-bordered"
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Password
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Your Password"
                                        className="input input-bordered"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Register as a
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        {...register("role", {
                                            required: true,
                                        })}
                                    >
                                        <option value="Learner">
                                            Learner
                                        </option>
                                        <option value="Instructor">
                                            Instructor
                                        </option>
                                    </select>
                                </div>
                                <p className="text-sm">
                                    Already have an account? Please{" "}
                                    <Link
                                        to="/login"
                                        className="text-indigo-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                                <div className="text-center">
                                    {isLoading && (
                                        <p className="text-teal-600">
                                            Loading...
                                        </p>
                                    )}
                                    {status && (
                                        <p className="text-teal-600">
                                            {status}
                                        </p>
                                    )}
                                    {error && (
                                        <p className="text-red-500">{error}</p>
                                    )}
                                </div>
                                <div className="form-control mt-2">
                                    <input
                                        className="btn bg-[#00897b] text-white hover:bg-[#0f4741]"
                                        type="submit"
                                        value="Sign Up"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Register;
