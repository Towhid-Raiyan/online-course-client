import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import { FadeLoader } from "react-spinners";
import EditCourseForm from "./EditCourseForm";
import { useForm } from "react-hook-form";

const ManageCourse = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (feedbackModalOpen) {
            window.my_modal_5.showModal();
        }
    }, [feedbackModalOpen]);

    const handleSendFeedback = (id) => {
        setSelectedCourse(id);
        setFeedbackModalOpen(true);
    };

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(
                `https://online-school-server-ten.vercel.app/api/courses/${user?.email}`,
                config
            );
            setCourses(response.data.courses);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(
                `https://online-school-server-ten.vercel.app/api/courses/${courseId}`,
                config
            );
            setCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
            setIsLoading(false);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const updateCourse = async (courseId, updatedData) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put(
                `https://online-school-server-ten.vercel.app/api/courses/${courseId}`,
                updatedData,
                config
            );
            fetchCourses(); // Refresh the list of course after updating
            setIsEditing(false);
            setFeedbackModalOpen(false);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const openEditForm = (course) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setFeedbackModalOpen(true);
    };

    const closeEditForm = () => {
        setSelectedCourse(null);
        setIsEditing(false);
        setFeedbackModalOpen(false);
    };
    console.log(courses);
    return (
        <div className="overflow-x-auto">
            {courses.length == 0 ? (
                <p>You have not added any course yet!</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Instructor</th>
                            <th>Content</th>
                            <th>Categories</th>
                            <th>CourseFee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="ms-[550px] mt-[100px]">
                                        <FadeLoader color="#36d7b7" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={course.picture}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">
                                                    {course.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {course.content}
                                        <br />
                                        <span className="badge badge-ghost mt-1">
                                            {course.categories}
                                        </span>
                                    </td>
                                    <td>{house.courseFee} </td>
                                    
                                    <td className="">
                                        <button
                                            className="btn btn-info btn-sm text-white me-2"
                                            onClick={() => openEditForm(course)}
                                        >
                                            <MdEditDocument /> Edit
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm text-white"
                                            onClick={() =>
                                                deleteCourse(course._id)
                                            }
                                        >
                                            <MdOutlineDelete /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            )}

            {isEditing && selectedCourse && (
                <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-6 px-12">
                        <div className="card-body">
                            <h2 className="font-bold text-xl text-center mb-6 underline-offset-8">
                                Edit House
                            </h2>
                            <EditCourseForm
                                house={selectedCourse}
                                onSubmit={(updatedData) =>
                                    updateCourse(selectedCourse._id, updatedData)
                                }
                                onCancel={closeEditForm}
                            />
                            <button className="btn" onClick={closeEditForm}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageCourse;
