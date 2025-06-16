import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
    const { id } = useParams(); // Use 'id' to match the route parameter name
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/data/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };
        fetchItem();
    }, [id]);

    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h1>School Image Data Details</h1>
            <p>ID: {item.ID}</p>
            <p>Website: {item.Website}</p>
            <p>Image URL: {item.Image_URL}</p>
            <p>Alt Text: {item.Alt_Text}</p>
            <p>Category: {item.Category}</p>
            <p>Local File: {item.Local_File}</p>
        </div>
    );
};

export default ItemDetail;
