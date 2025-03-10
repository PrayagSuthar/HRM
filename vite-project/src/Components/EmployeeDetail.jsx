


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
