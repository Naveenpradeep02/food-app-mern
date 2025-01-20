import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from 'react-toastify'

const List = () => {

    const [list, setList] = useState([])
    const url = "http://localhost:4000"
    // const remove = "http://localhost:4000/api/food/remove"

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response.data);

        if (response.data.success) {
            setList(response.data.data)
        }
        else {
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        // console.log("Removing food with ID:", foodId); 
        try {
            const response = await axios.post(`${url}/api/food/remove`, {
                id: foodId, // Send id in the request body
            }, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                setList(prevList => prevList.filter(item => item._id !== foodId)); // Update state
                toast.success("Food removed successfully");
            } else {
                toast.error("Failed to remove food");
            }
        } catch (error) {
            toast.error("Error removing food: " + error.message);
        }
    };
    
    
    

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={item._id} className='list-table-format'>
                            {/* <img src={`${url}/images/`+item.image} alt="" /> */}
                            <img src={`http://localhost:4000/images/` + item.image} alt="" />

                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List