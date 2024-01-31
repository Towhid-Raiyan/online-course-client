import React, { useState, useEffect } from "react";
import Container from "../../Layout/Container/Container";
import CourseCard from "./CourseCard";
// import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch } from "react-icons/fa";

// import { motion } from "framer-motion";
// import { fadeIn } from "../../Utils/animationVariants";

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        bedrooms: "",
        bathrooms: "",
        roomSize: "",
        availability: "",
        rentMin: "",
        rentMax: "",
    });
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currentPage === 1){
            fetchCourses();
        }
    }, [currentPage]);

    const fetchCourses = async (page = 1) => {
        // console.log(page);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(
                `https://online-school-server-ten.vercel.app/api/courses?page=${queryParams}`
            );
            const data = await response.json();

            if (currentPage === 1) {
                setCourses(data.courses);
            } else {
                setCourses((prevCourses) => [...prevCourses, ...data.courses]);
            }

            setCurrentPage(page + 1);
            setHasMore(data.courses.length > 0);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSearch = async () => {
        try {
            setCourses([]);
            setCurrentPage(1);
            fetchCourses(1);
        } catch (error) {
            console.error("Error searching courses:", error);
        }
    };

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <div className="flex  items-center md:justify-center md:gap-6 mt-10 mb-10 flex-col md:flex-row gap-2">
                <input
                    type="text"
                    id="contentInput"
                    name="content"
                    className="input input-xs md:min-w-xs input-accent  w-28"
                    placeholder="content"
                    value={filters.content}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    id="categoriesInput"
                    name="categories"
                    className="input input-xs md:min-w-xs input-accent  w-28"
                    placeholder="categories"
                    value={filters.categories}
                    onChange={handleInputChange}
                />


                <input
                    type="number"
                    id="rentInput"
                    name="rent"
                    className="input input-xs min-w-xs input-accent  w-28"
                    placeholder="Rent"
                    value={filters.rent}
                    onChange={handleInputChange}
                />
                <button
                    className="btn bg-teal-600 px-5 btn-xs text-xs text-slate-50 hover:bg-teal-800"
                    onClick={handleSearch}
                >
                    <FaSearch></FaSearch> Search
                </button>
            </div>

            {/* show courses  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course}></CourseCard>
                ))}
            </div>
        </Container>
    );
};

export default CourseListing;
