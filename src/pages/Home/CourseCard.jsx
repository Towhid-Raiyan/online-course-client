import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../../hook/animationVariants";

const CourseCard = ({ course }) => {
    const { user, fullName } = useContext(AuthContext);
    const {
        name,
        courseFee,
        content,
        categories,
        _id,
        picture
    } = course;

    const handleBooking = async (id) => {
        const token = localStorage.getItem("token");
        console.log(id);
        if (user?.role === "Instructor") {
            toast.error("Only Learner can book course");

            return;
        } else {
            try {
                const bookingData = {
                    name: user.fullName,
                    email: user.email,
                    courseId: id,
                };
                console.log(bookingData);
                const response = await fetch(
                    "https://online-school-server-ten.vercel.app/api/bookings",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(bookingData),
                    }
                );

                if (response.ok) {
                    toast.success("Booking created successfully");
                } else {
                    const data = await response.json();
                    toast.error(data.error);
                }
            } catch (error) {
                console.error("Error creating booking:", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };
    return (
        <div>
            <ToastContainer />
            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className="block rounded-lg p-4 shadow-lg shadow-indigo-100"
            >
                <img
                    alt="Home"
                    src={picture}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <p className="text-md mb-2">Name: {name}</p>
                        <div>
                            <dt className="sr-only">Price</dt>

                            <p className="text-sm">
                                {" "}
                                <span className="text-gray-500">
                                    Course Fee:
                                </span>{" "}
                                <span className="text-teal-600">
                                    ${courseFee}
                                </span>{" "}
                            </p>
                        </div>

                        <div>
                            <dt className="sr-only">Content</dt>

                            <dd className="font-medium">
                                {`${content}, ${categories}`}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-4">
                        <button
                            onClick={() => handleBooking(_id)}
                            className="btn w-full rounded p-2 bg-teal-500 text-white hover:bg-teal-700"
                        >
                            Book
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CourseCard;
