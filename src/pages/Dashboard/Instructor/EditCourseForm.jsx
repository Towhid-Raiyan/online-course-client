import React, { useState } from "react";

const EditCourseForm = ({ house, onSubmit }) => {
    const [formData, setFormData] = useState(house);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="content">Content</label>
            <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="categories">Categories</label>
            <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            
            <label htmlFor="courseFee">Course Fee</label>
            <input
                type="number"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            {/* TODO: add other fields with customize the view */}
            {/* Add other input fields for editing the house details */}
            <button type="submit" className="btn bg-teal-600 hover:bg-teal-800 w-full text-white">
                Update
            </button>
        </form>
    );
};

export default EditCourseForm;
