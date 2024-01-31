import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "../../../Layout/Container/Container";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingCards from "./BookingCards";
import { ToastContainer, toast } from "react-toastify";

const ManageBookings = () => {
    const { user } = useContext(AuthContext);

    const [bookedCourses, setBookedCourses] = useState([]);
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "", // Automatically filled and cannot be modified
        phone: "",
        houseId: "",
    });

    useEffect(() => {
        // Fetch the list of booked courses for the Learner
        fetchBookedCourses();
    }, []);

    const fetchBookedCourses = async () => {
        const token = localStorage.getItem("token");
        try {
            const userEmail = user?.email;
            // console.log(userEmail);
            const response = await axios.get(
                `https://online-school-server-ten.vercel.app/api/learner/bookings/${userEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setBookedCourses(response.data.bookings);
                // console.log(response.data.bookings);
            }
        } catch (error) {
            console.error("Error fetching booked courses:", error);
        }
    };

    const handleRemoveBooking = async (bookingId) => {
        // console.log(bookingId);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `https://online-school-server-ten.vercel.app/api/bookings/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Handle successful removal of booking
                toast.success("Booking Canceled Success!");
                fetchBookedCourses(); // Refresh the list of booked courses
            }
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    return (
        <Container>
            <ToastContainer />

            {/* Booked Houses List */}
            <h3 className="text-4xl text-center font-bold mt-10 ">Your Bookings </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-20 ">
                {
                    bookedCourses.length === 0 && <p className="text-accent text-center font-bold"> You have no booking yet!</p>
                }
                {bookedCourses.map((booking) => (
                    <BookingCards
                        key={booking._id}
                        booking={booking}
                        handleRemoveBooking={handleRemoveBooking}
                    ></BookingCards>
                ))}
            </div>
        </Container>
    );
};

export default ManageBookings;
