// src/pages/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user)
        return <h2 className="text-center text-2xl mt-10">Please login first</h2>;

    const goToCategorization = () => {
        navigate("/catogerization"); // navigate to categorization page
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome, {user.username}!
                    </h2>
                    <p className="text-gray-600 mb-6">Email: {user.email}</p>

                    <button
                        onClick={goToCategorization}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Go for Categorization
                    </button>
                </div>
            </div>
        </div>
    );
}
