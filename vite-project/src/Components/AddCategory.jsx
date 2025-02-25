// eslint-disable-next-line no-unused-vars
import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState("")
    const navigate=useNavigate()
    // const handleSubmit =(e) => {
    //     e.preventDefault()
    //     axios.post('http://localhost:3000/auth/add_category',{category})
    //     .then(result => {
    //         if(result.data.status){
    //             navigate('/dashboard/category')
    //         } else {
    //             alert(result.data.Error)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', { category }, {
            headers: { "Content-Type": "application/json" }
        })
        .then(result => {
            if(result.data.Status) { // Ensure case matches backend response
                navigate('/dashboard/category');
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    };
    return (
        <div className="d-flex justify-content-center align-items-center h-75 ">
            <div className="p-3 rounded w-25 border ">
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="category"><strong>Category</strong></label>
                        <input
                            type="text"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter Category"
                            className="form-control rounded-0"
                            
                            required
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">Add Category</button>
                   
                </form>
            </div>
        </div>
    );
}

export default AddCategory