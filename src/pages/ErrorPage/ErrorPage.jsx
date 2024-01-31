import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="grid h-screen px-4 bg-white place-content-center">
                <div className="text-center">
                    <h1 className="font-black text-gray-800 text-9xl animate-pulse">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-300 sm:text-4xl">
                        Uh-oh!
                    </p>

                    <p className="mt-4 text-gray-500">
                        We can't find that page.
                    </p>

                    <Link
                        href="/"
                        className="inline-block px-5 py-3 mt-6 text-md font-medium text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
