import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import {
    MdCalendarMonth,
    MdOutlineBathroom,
    MdOutlineBedroomChild,
    MdOutlineHouse,
} from "react-icons/md";

const BookingCards = ({ booking, handleRemoveBooking }) => {
    const courseid = booking.courseId;
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchCourse(courseid);
    }, [courseid]);
    const fetchCourse = async (courseId) => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `http://localhost:3000/api/course/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setCourse(response.data.result);
                console.log(response.data.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching booked courses:", error);
        }
    };
    return (
        <div>
            {isLoading ? (
                <p> Loading ... </p>
            ) : (
                <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                    <img
                        src={course.picture}
                        alt=""
                        className="h-72 w-full rounded-md object-cover"
                    />
                    <div className="my-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">
                                    Address: {course.content}
                                </p>

                                <p className="text-sm text-gray-500 ">
                                    Instructor : {course.name}
                                </p>
                            </div>
                            <div className="flex items-center badge p-4 shadow-md">
                                {" "}
                                <FaDollarSign className="text-xl text-indigo-400" />{" "}
                                <p className="font-bol text-xl">
                                    {" "}
                                    {course.courseFee}{" "}
                                </p>
                            </div>
                        </div>

                        {/* <div className="flex gap-6 items-center justify-between text-sm my-2">
                            <div className="flex items-center gap-1">
                                <MdOutlineHouse className="text-xl text-indigo-400"></MdOutlineHouse>{" "}
                                <p>Room Size: {course.roomSize} sf</p>{" "}
                            </div>
                            <div className="flex gap-1">
                                <MdOutlineBedroomChild className="text-xl text-indigo-400"></MdOutlineBedroomChild>{" "}
                                <p>{course.bedrooms} Bedrooms</p>{" "}
                            </div>
                            <div className="flex gap-1">
                                <MdOutlineBathroom className="text-xl text-indigo-400"></MdOutlineBathroom>{" "}
                                <p>{course.bathrooms} Bathrooms</p>{" "}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-teal-500">
                            {" "}
                            <MdCalendarMonth /> {course.availabilityDate}{" "}
                        </div> */}
                    </div>
                    <div className="flex justify-end">
                        <button
                            className=" btn bg-red-400 hover:bg-red-500 btn-sm text-white shadow-lg"
                            onClick={() => {
                                handleRemoveBooking(booking._id);
                            }}
                        >
                            Cancel booking
                        </button>
                    </div>
                    <div className="sm:flex sm:justify-between sm:gap-4"></div>
                </div>
            )}
        </div>
    );
};

export default BookingCards;
