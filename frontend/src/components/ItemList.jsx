import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../redux/itemsSlice';
import { Link } from 'react-router-dom';

const ItemList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.data);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <div>
            <h1>School List</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.ID}>
                        <Link to={`/items/${item.ID}`}>{item.Alt_Text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
