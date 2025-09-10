// src/pages/Catogerization.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Catogerization() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categorization");
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Categorization</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
                        <img
                            src={item.imageUrl}
                            alt={item.altText}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-lg mb-1">{item.category}</h2>
                            <p className="text-gray-600 text-sm mb-1"><strong>School:</strong> {item.schoolName}</p>
                            <p className="text-gray-500 text-xs"><strong>Website:</strong> {item.website}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
