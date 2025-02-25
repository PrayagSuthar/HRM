// // eslint-disable-next-line no-unused-vars
// import React from 'react'
// import {useEffect} from 'react'
// import { useParams,useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useState } from 'react'

// const EmployeeDetail = () => {
//     const [employee,setEmployee] = useState({})
//     const {Id} = useParams()
//     const navigate = useNavigate()
//     useEffect(() => {
//         axios.get(`http://localhost:3000/employee/detail/${Id}`)
//         .then(result => {
//           console.log(result.data)
//           setEmployee(result.data.length > 0 ? result.data[0] : {});
//     })
//         .catch(err => console.log(err))
//     },[Id]);

//     const handleLogout = () => {
//       axios.get('http://localhost:3000/employee/logout')
//       .then(result => {
//         if(result.data.Status){
//           navigate('/start')
//         }
//       }).catch(err => console.log(err))
//     }  
//   return (
//     <div>
//       <div className="p-2 d-flex justify-content-center shadow">
//         <h4>Employee Management System</h4>
//       </div>
//       <div className="d-flex justify-content-center flex-column align-items-center mt-3">
//         <div className="d-flex align-items-center flex-column mt-5">
//           <h3>Firstname: {employee.Firstname}</h3>
//           <h3>Lastname: {employee.Lastname}</h3>
//           <h3>Email: {employee.Email}</h3>
//           <h3>MobileNO: {employee.MobileNO}</h3>
//           <h3>EmployeeType: {employee.EmployeeType}</h3>
//           <h3>Role: {employee.Role}</h3>
//           <h3>TotalAvailablePaidLeave: {employee.TotalAvailablePaidLeave}</h3>
//           <h3>TotalPaidLeave: {employee.TotalPaidLeave}</h3>
//           <h3>TotalUnpaidLeave: {employee.TotalUnpaidLeave}</h3>
//           <h3>Leader: {employee.Leader}</h3>
//           <h3>TotalAvailableOptionalLeave: {employee.TotalAvailableOptionalLeave}</h3>
//           <h3>Address: {employee.Address}</h3>
//           <h3>Birthdate: {employee.Birthdate}</h3>
//           <h3>Designation: {employee.Designation}</h3>
//           <h3>EMPCode: {employee.EMPCode}</h3>
//           <h3>Email: {employee.Email}</h3>

//         </div>
//         <div>
//           <button className="btn btn-primary me-2">Edit</button>
//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmployeeDetail;


// eslint-disable-next-line no-unused-vars


import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
    const { Id } = useParams(); // Get user ID from URL
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${Id}`)
            .then(response => {
                if (response.data) {
                    setEmployee(response.data);
                } else {
                    setError("Employee not found.");
                }
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setError("Failed to fetch employee details.");
            });
    }, [Id]);
    const handleLogout = () => {
      axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if(result.data.Status){
          localStorage.removeItem("valid")
          navigate('/')
        }
      }).catch(err => console.log(err))
    }
    return (
        <div className="container mt-5">
            <h2>Employee Details</h2>
            {error ? (
                <p className="text-danger">{error}</p>
            ) : employee ? (
                <div className="card p-3">
                    <p><strong>Firstname:</strong> {employee.Firstname}</p>
                    <p><strong>Lastname:</strong> {employee.Lastname}</p>
                    <p><strong>Email:</strong> {employee.Email}</p>
                    <p><strong>MobileNO:</strong> {employee.MobileNO}</p>
                    <p><strong>EmployeeType:</strong> {employee.EmployeeType}</p>
                    <p><strong>Salary:</strong> ${employee.Salary}</p>
                    <p><strong>CreatedAt:</strong> {employee.CreatedAt}</p>
                    <p><strong>TotalAvailablePaidLeave:</strong> {employee.TotalAvailablePaidLeave}</p>
                    <p><strong>TotalPaidLeave:</strong> {employee.TotalPaidLeave}</p>
                    <p><strong>TotalUnpaidLeave:</strong> {employee.TotalUnpaidLeave}</p>
                    <p><strong>TotalAvailableOptionalLeave:</strong> {employee.TotalAvailableOptionalLeave}</p>
                    <p><strong>Address:</strong> {employee.Address}</p>
                    <p><strong>Birthdate:</strong> {employee.Birthdate}</p>
                    <p><strong>EMPCode:</strong> {employee.EMPCode}</p>
                    <p><strong>Category_Id:</strong> {employee.Category_Id}</p>
                    <div>
                    <button className="btn btn-primary me-2">Edit</button>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EmployeeDetail;
