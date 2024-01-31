import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Container from "../../../Layout/Container/Container";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const AddCourse = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { user } = useContext(AuthContext);
    const onSubmit = async (data) => {
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        // console.log(data);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://online-school-server-ten.vercel.app/api/courses",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Course added successfully");
                reset();
            }
        } catch (error) {
            setError("Error adding course. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mt-10">
            <ToastContainer/>
            <Container>
                {isLoading && <p>Loading...</p>}
                {/* {error && <p className="error">{error}</p>} */}
                {successMessage && <p className="success">{successMessage}</p>}
                <div className=" flex justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-6 px-12"
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <h2 className="font-bold text-xl text-center mb-6 underline-offset-8">
                                    Add New Course
                                </h2>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered me-6 mb-4 w-full"
                                    placeholder="Name"
                                    {...register("name", { required: true })}
                                />
                                <div className="flex justify-start">
                                    <input
                                        type="text"
                                        name="content"
                                        className="input input-bordered me-6 mb-4 w-full"
                                        placeholder="Content"
                                        {...register("content", {
                                            required: true,
                                        })}
                                    />

                                    <input
                                        type="text"
                                        name="categories"
                                        className="input input-bordered ms-4 "
                                        placeholder="Categories"
                                        {...register("categories", {
                                            required: true,
                                        })}
                                    />
                                </div>

                               
                                <input
                                    type="text"
                                    name="picture"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Picture URL"
                                    {...register("picture", { required: true })}
                                />

                                <input
                                    type="number"
                                    name="courseFee"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Course Fee"
                                    {...register("courseFee", {
                                        required: true,
                                    })}
                                />

                                <div className="flex">
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered mb-4 w-full me-6"
                                    value={user.email}
                                    placeholder="Email"
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber", {
                                        required: true,
                                    })}
                                />
                                </div>

                                <textarea
                                    name="description"
                                    className="textarea textarea-bordered mb-4 w-full"
                                    placeholder="Description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn bg-teal-600 text-white my-4 hover:bg-teal-800"
                                >
                                    Add Course
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default AddCourse;
