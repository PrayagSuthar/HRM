
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    MobileNo: "",
    Profile: null, 
    IsActive: false,
    IsDeleted: false,
    EmployeeType: "FULLTIME",
    Category_Id: "",
    Salary: "",
    Role: null, 
    TotalAvailablePaidLeave: "",
    TotalPaidLeave: "",
    TotalUnpaidLeave: "",
    TeamLeader: null,
    TotalAvailableOptionalLeave: "",
    Address: "",
    Birthdate: "",
    Designation: "",
    EMPCode: "",
    ResignationDate: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const navigate=useNavigate()


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    
    if (value === "") finalValue = null;

    
    if (type === "checkbox") finalValue = checked;

    setEmployee({ ...employee, [name]: finalValue });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    
    Object.entries(employee).forEach(([key, value]) => {
      formData.append(key, value === "" ? null : value);
    });

   
    if (selectedFile) {
      formData.append("Profile", selectedFile);
    }

    console.log("Final Payload:", Object.fromEntries(formData));

    try {
      const response = await axios.post("http://localhost:3000/auth/add_employee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(result => {
        if(result.data.Status){
          navigate('/dashboard/employee')
        } else {
          alert(result.data.Error)
        }
      })

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2 className="form-title">Add Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" id="Firstname" name="Firstname" className="input-field" placeholder="First Name" onChange={handleChange} required />
        <input type="text" id="Lastname" name="Lastname" className="input-field" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" id="Email" name="Email" className="input-field" placeholder="Email" onChange={handleChange} required />
        <input type="password" id="Password" name="Password" className="input-field" placeholder="Password" onChange={handleChange} required />
        <input type="number" id="MobileNo" name="MobileNo" className="input-field" placeholder="Mobile No" onChange={handleChange} required />
        
      
        <input type="file" id="Profile" name="Profile" className="input-field" onChange={handleFileChange} />

      
        <label>
          <input type="checkbox" id="IsActive" name="IsActive" className="checkbox" checked={employee.IsActive} onChange={handleChange} />
          Active
        </label>
        <label>
          <input type="checkbox" id="IsDeleted" name="IsDeleted" className="checkbox" checked={employee.IsDeleted} onChange={handleChange} />
          Deleted
        </label>

       
        <select id="EmployeeType" name="EmployeeType" className="select-field" onChange={handleChange} required>
          <option value="FULLTIME">Full-Time</option>
          <option value="PARTTIME">Part-Time</option>
          <option value="CONTRACT">Contract</option>
        </select>

        <input type="number" id="Salary" name="Salary" className="input-field" placeholder="Salary" onChange={handleChange} required />

      
        <select id="Role" name="Role" className="select-field" onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="123e4567-e89b-12d3-a456-426614174000">Admin</option>
          <option value="789e4567-e89b-12d3-a456-426614174111">Employee</option>
        </select>

        
        <select id="TeamLeader" name="TeamLeader" className="select-field" onChange={handleChange}>
          <option value="">Select Team Leader</option>
          <option value="567e4567-e89b-12d3-a456-426614174222">John Doe</option>
          <option value="987e4567-e89b-12d3-a456-426614174333">Jane Smith</option>
        </select>

        <input type="number" id="TotalAvailablePaidLeave" name="TotalAvailablePaidLeave" className="input-field" placeholder="Total Available Paid Leave" onChange={handleChange} required />
        <input type="number" id="TotalPaidLeave" name="TotalPaidLeave" className="input-field" placeholder="Total Paid Leave" onChange={handleChange} required />
        <input type="number" id="TotalUnpaidLeave" name="TotalUnpaidLeave" className="input-field" placeholder="Total Unpaid Leave" onChange={handleChange} required />
        <input type="number" id="TotalAvailableOptionalLeave" name="TotalAvailableOptionalLeave" className="input-field" placeholder="Total Available Optional Leave" onChange={handleChange} required />

        <input type="text" id="Address" name="Address" className="input-field" placeholder="Address" onChange={handleChange} />
        <input type="date" id="Birthdate" name="Birthdate" className="input-field" onChange={handleChange} required />
        <input type="text" id="Designation" name="Designation" className="input-field" placeholder="Designation" onChange={handleChange} />
        <input type="text" id="EMPCode" name="EMPCode" className="input-field" placeholder="EMP Code" onChange={handleChange} />
        <input type="date" id="ResignationDate" name="ResignationDate" className="input-field" onChange={handleChange} />
        <input type="number" id="Category_Id" name="Category_Id" className="input-field" placeholder="Category ID" onChange={handleChange} />

        <button type="submit" id="submit-button" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
