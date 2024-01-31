import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate();
    const registerUser = async (fullName, email, password, role) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/register",
                {
                    fullName,
                    email,
                    password,
                    role,
                }
            );

            if (response.status === 201) {
                setUser({ email, role, fullName });

                return response.data;
            } else {
                throw new Error("User registration failed");
            }
        } catch (error) {
            throw new Error(error.response.data.error); // Throw backend error message
        }
    };
    // user login
    const loginUser = async (email, password) => {
        try {
            // Make a POST request to the login endpoint
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {
                    email,
                    password,
                }
            );
            const { token } = response.data;
            localStorage.setItem("token", token);
            const { role, fullName } = response.data;
            console.log(response.data);
            setUser({ email, role, fullName });

            return response.data;
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        return "logout success";
    };

    useEffect(() => {
        // Check if the user is already authenticated in localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            // Decode the token to retrieve user information
            const decodedToken = jwt_decode(storedToken);
            const { email, role, fullName } = decodedToken;

            setUser({ email, role, fullName });
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const authInfo = {
        user,
        setUser,
        registerUser,
        loginUser,
        logOut,
    };
    // console.log('auth provider');

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
