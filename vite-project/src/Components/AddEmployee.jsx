// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const AddEmployee = () => {
//   const [employee, setEmployee] = useState({
//     Id: "",
//     Firstname: "",
//     Lastname: "",
//     Email: "",
//     Password: "",
//     MobileNo: "",
//     Profile: "",
//     IsActive: false,
//     IsDeleted: false,
//     EmployeeType: "FULLTIME",
//     Category_Id: "",
//     Salary: "",
//     CreatedAt: "",
//     UpdatedAt: "",
//     Role: "",
//     TotalAvailablePaidLeave: "",
//     TotalPaidLeave: "",
//     TotalUnpaidLeave: "",
//     TeamLeader: "",
//     TotalAvailableOptionalLeave: "",
//     Address: "",
//     Birthdate: "",
//     Designation: "",
//     EMPCode: "",
//     ResignationDate: "",
//   });
//   const [category, setCategory] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleSubmit= (e) => {
//     e.preventDefault()
//     axios.post('http://localhost:3000/auth/add_employee', employee)
//     .then(result => console.log(result.data))
//     .catch(err => console.log(err))
//   }
//   return (
//     <div className="d-flex justify-content-center align-items-center h-125  mt-3">
//       <div className="p-3 rounded w-50 border ">
//         <h2 className="text-center">Add Employee</h2>
//         <form className="row g-1" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="id" className="form-label">
//               <strong>ID</strong>
//             </label>
//             <input
//               type="text"
//               name="id"
//               id="id"
//               className="form-control rounded-0"
//               placeholder="Enter ID"
//               onChange={(e) => setEmployee({ ...employee, Id: e.target.value })}
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="firstname" className="form-label">
//               <strong>Firstname</strong>
//             </label>
//             <input
//               type="text"
//               name="firstname"
//               id="firstname"
//               className="form-control rounded-0"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Firstname: e.target.value })
//               }
//               placeholder="Enter Firstname"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="lastname" className="form-label">
//               <strong>Lastname</strong>
//             </label>
//             <input
//               type="text"
//               name="lastname"
//               id="lastname"
//               className="form-control rounded-0"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Lastname: e.target.value })
//               }
//               placeholder="Enter Lastname"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="email" className="form-label">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="form-control rounded-0"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Email: e.target.value })
//               }
//               placeholder="Enter Email"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="password" className="form-label">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="form-control rounded-0"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Password: e.target.value })
//               }
//               placeholder="Enter Password"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="mobileNo" className="form-label">
//               <strong>Mobile No</strong>
//             </label>
//             <input
//               type="number"
//               name="mobileNo"
//               id="mobileNo"
//               onChange={(e) =>
//                 setEmployee({ ...employee, MobileNo: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Mobile No"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="profile" className="form-label">
//               <strong>Profile</strong>
//             </label>
//             <input
//               type="file"
//               name="profile"
//               id="profile"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Profile: e.target.files[0] })
//               }
//               className="form-control rounded-0"
//               placeholder="Profile URL"
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="isActive" className="form-label">
//               <strong>Is Active</strong>
//             </label>
//             <select
//               name="isActive"
//               id="isActive"
//               onChange={(e) =>
//                 setEmployee({ ...employee, IsActive: e.target.value })
//               }
//               className="form-control rounded-0"
//             >
//               <option value="1">Yes</option>
//               <option value="0">No</option>
//             </select>
//           </div>

//           <div className="col-12">
//             <label htmlFor="isDeleted" className="form-label">
//               <strong>Is Deleted</strong>
//             </label>
//             <select
//               name="isDeleted"
//               id="isDeleted"
//               onChange={(e) =>
//                 setEmployee({ ...employee, IsDeleted: e.target.value })
//               }
//               className="form-control rounded-0"
//             >
//               <option value="1">Yes</option>
//               <option value="0">No</option>
//             </select>
//           </div>

//           <div className="col-12">
//             <label htmlFor="employeeType" className="form-label">
//               <strong>Employee Type</strong>
//             </label>
//             <select
//               name="employeeType"
//               id="employeeType"
//               onChange={(e) =>
//                 setEmployee({ ...employee, EmployeeType: e.target.value })
//               }
//               className="form-control rounded-0"
//             >
//               <option value="FULLTIME">Full-Time</option>
//               <option value="PARTTIME">Part-Time</option>
//               <option value="CONTRACT">Contract</option>
//             </select>
//           </div>

//           <div className="col-12">
//             <label htmlFor="category" className="form-label">
//               <strong>Category</strong>
//             </label>
//             <select
//               name="category"
//               id="category"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Category_Id: e.target.value })
//               }
//               className="form-select"
//             >
//               {category.map((c) => {
//                 return <option key={c.id}>{c.name}</option>;
//               })}
//             </select>
//           </div>

//           <div className="col-12">
//             <label htmlFor="salary" className="form-label">
//               <strong>Salary</strong>
//             </label>
//             <input
//               type="number"
//               id="salary"
//               name="salary"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Salary: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Salary"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="createdAt" className="form-label">
//               <strong>Created At</strong>
//             </label>
//             <input
//               type="date"
//               id="createdAt"
//               name="createdAt"
//               onChange={(e) =>
//                 setEmployee({ ...employee, CreatedAt: e.target.value })
//               }
//               className="form-control rounded-0"
//               required
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="Category_Id" className="form-lable"><strong>Category_Id</strong></label>
//               <input type="Number" id="Category_Id" className="form-control rounded-0" onChange={(e) => setEmployee({...employee,Category_Id:e.target.value})}></input>
//           </div>

//           <div className="col-12">
//             <label htmlFor="updatedAt" className="form-label">
//               <strong>Updated At</strong>
//             </label>
//             <input
//               type="date"
//               id="updatedAt"
//               name="updatedAt"
//               onChange={(e) =>
//                 setEmployee({ ...employee, UpdatedAt: e.target.value })
//               }
//               className="form-control rounded-0"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="role" className="form-label">
//               <strong>Role</strong>
//             </label>
//             <input
//               type="text"
//               name="role"
//               id="role"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Role: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Role ID"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="totalAvailablePaidLeave" className="form-label">
//               <strong>Total Available Paid Leave</strong>
//             </label>
//             <input
//               type="number"
//               id="totalAvailablePaidLeave"
//               name="totalAvailablePaidLeave"
//               onChange={(e) =>
//                 setEmployee({
//                   ...employee,
//                   TotalAvailablePaidLeave: e.target.value,
//                 })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Available Paid Leave"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="totalPaidLeave" className="form-label">
//               <strong>Total Paid Leave</strong>
//             </label>
//             <input
//               type="number"
//               name="totalPaidLeave"
//               id="totalPaidLeave"
//               className="form-control rounded-0"
//               onChange={(e) =>
//                 setEmployee({ ...employee, TotalPaidLeave: e.target.value })
//               }
//               placeholder="Enter Paid Leave"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="teamLeader" className="form-label">
//               <strong>Team Leader</strong>
//             </label>
//             <input
//               type="text"
//               name="teamLeader"
//               id="teamLeader"
//               onChange={(e) =>
//                 setEmployee({ ...employee, TeamLeader: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Team Leader ID"
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="totalAvailableOptionalLeave" className="form-label">
//               <strong>Total Available Optional Leave</strong>
//             </label>
//             <input
//               type="number"
//               name="totalAvailableOptionalLeave"
//               id="totalAvailableOptionLeave"
//               onChange={(e) =>
//                 setEmployee({
//                   ...employee,
//                   TotalAvailableOptionalLeave: e.target.value,
//                 })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Available Option Leave"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="address" className="form-label">
//               <strong>Address</strong>
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Address: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Address"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="birthdate" className="form-label">
//               <strong>Birthdate</strong>
//             </label>
//             <input
//               type="date"
//               id="birthdate"
//               name="birthdate"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Birthdate: e.target.value })
//               }
//               className="form-control rounded-0"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="designation" className="form-label">
//               <strong>Designation</strong>
//             </label>
//             <input
//               type="text"
//               name="designation"
//               id="designation"
//               onChange={(e) =>
//                 setEmployee({ ...employee, Designation: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter Designation"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="empCode" className="form-label">
//               <strong>EMP Code</strong>
//             </label>
//             <input
//               type="text"
//               name="empCode"
//               id="empCode"
//               onChange={(e) =>
//                 setEmployee({ ...employee, EMPCode: e.target.value })
//               }
//               className="form-control rounded-0"
//               placeholder="Enter EMP Code"
//               required
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="resignationDate" className="form-label">
//               <strong>Resignation Date</strong>
//             </label>
//             <input
//               type="date"
//               name="resignationDate"
//               id="resignationDate"
//               onChange={(e) =>
//                 setEmployee({ ...employee, ResignationDate: e.target.value })
//               }
//               className="form-control rounded-0"
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-success w-100 rounded-0 mb-2"
//           >
//             Add Employee
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;


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
    Profile: null, // Profile handled separately for file upload
    IsActive: false,
    IsDeleted: false,
    EmployeeType: "FULLTIME",
    Category_Id: "",
    Salary: "",
    Role: null, // Ensure this is either a valid GUID or null
    TotalAvailablePaidLeave: "",
    TotalPaidLeave: "",
    TotalUnpaidLeave: "",
    TeamLeader: null, // Ensure this is either a valid GUID or null
    TotalAvailableOptionalLeave: "",
    Address: "",
    Birthdate: "",
    Designation: "",
    EMPCode: "",
    ResignationDate: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const navigate=useNavigate()

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    // Convert empty string to null for nullable fields
    if (value === "") finalValue = null;

    // Convert checkboxes to boolean values
    if (type === "checkbox") finalValue = checked;

    setEmployee({ ...employee, [name]: finalValue });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all form fields
    Object.entries(employee).forEach(([key, value]) => {
      formData.append(key, value === "" ? null : value);
    });

    // Append file if selected
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
        
        {/* Profile Picture Upload */}
        <input type="file" id="Profile" name="Profile" className="input-field" onChange={handleFileChange} />

        {/* Active & Deleted Status */}
        <label>
          <input type="checkbox" id="IsActive" name="IsActive" className="checkbox" checked={employee.IsActive} onChange={handleChange} />
          Active
        </label>
        <label>
          <input type="checkbox" id="IsDeleted" name="IsDeleted" className="checkbox" checked={employee.IsDeleted} onChange={handleChange} />
          Deleted
        </label>

        {/* Employee Type */}
        <select id="EmployeeType" name="EmployeeType" className="select-field" onChange={handleChange} required>
          <option value="FULLTIME">Full-Time</option>
          <option value="PARTTIME">Part-Time</option>
          <option value="CONTRACT">Contract</option>
        </select>

        <input type="number" id="Salary" name="Salary" className="input-field" placeholder="Salary" onChange={handleChange} required />

        {/* Role Selection */}
        <select id="Role" name="Role" className="select-field" onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="123e4567-e89b-12d3-a456-426614174000">Admin</option>
          <option value="789e4567-e89b-12d3-a456-426614174111">Employee</option>
        </select>

        {/* Team Leader Selection */}
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
