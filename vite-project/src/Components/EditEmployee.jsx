// eslint-disable-next-line no-unused-vars
import React from 'react'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const EditEmployee = () => {
    const {Id} = useParams()
    const [employee, setEmployee] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        MobileNo: "",
         
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
      const[category,setCategory]=useState([])
      const navigate=useNavigate()
      
    useEffect(() => {
      axios.get('http://localhost:3000/auth/category')
      .then(result=>{
          // console.log(result.data)
          if(result.data.Status){
              setCategory(result.data.Result);
          } else {
              alert(result.data.Error)
          }
      }).catch(err => console.log(err))
      axios.get(`http://localhost:3000/auth/employee/${Id}`)
      .then(result => {
          // const data=result.data.Result[0];
          const formatDate = (date) => date ? new Date(date).toISOString().split("T")[0] : "";
          setEmployee({
            ...employee,
            Firstname: result.data.Result[0].Firstname,
            Lastname: result.data.Result[0].Lastname,
            Email: result.data.Result[0].Email,
            // Password: result.data.Result[0].Password,
            MobileNo: result.data.Result[0].MobileNo,
            // Profile: result.data.Result[0].Profile,
            IsActive: result.data.Result[0].IsActive,
            IsDeleted: result.data.Result[0].IsDeleted,
            EmployeeType: result.data.Result[0].EmployeeType,
            Category_Id: result.data.Result[0].Category_Id,
            Salary: result.data.Result[0].Salary,
            Role: result.data.Result[0].Role || "",
            TotalAvailablePaidLeave: result.data.Result[0].TotalAvailablePaidLeave,
            TotalPaidLeave: result.data.Result[0].TotalPaidLeave,
            TotalUnpaidLeave:result.data.Result[0].TotalUnpaidLeave,
            TeamLeader: result.data.Result[0].TeamLeader || "",
            TotalAvailableOptionalLeave: result.data.Result[0].TotalAvailableOptionalLeave,
            Address: result.data.Result[0].Address,
            Birthdate: formatDate(result.data.Result[0].Birthdate ? new Date(result.data.Result[0].Birthdate).toISOString().split("T")[0] : ""),
            Designation: result.data.Result[0].Designation,
            EMPCode: result.data.Result[0].EMPCode,
            ResignationDate: formatDate(result.data.Result[0].ResignationDate ? new Date(result.data.Result[0].ResignationDate).toISOString().split("T")[0] : ""),
            
          })
      }).catch(err => console.log(err))
  },[]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    
    if (value === "") finalValue = null;

    
    if (type === "checkbox") finalValue = checked;

    setEmployee({ ...employee, [name]: finalValue });
  };


  const handleSubmit= (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/auth/edit_employee/${Id}`,employee)
    .then(result => {
      // console.log(result.data)
      if(result.data.Status){
        navigate('/dashboard/employee')
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="add-employee-container">
      <h2 className="form-title">Edit Employee</h2>
      <form  encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" id="Firstname" name="Firstname" className="input-field" placeholder="First Name" onChange={handleChange} value={employee.Firstname} required />
        <input type="text" id="Lastname" name="Lastname" className="input-field" placeholder="Last Name" onChange={handleChange} value={employee.Lastname} required />
        <input type="email" id="Email" name="Email" className="input-field" placeholder="Email" onChange={handleChange} value={employee.Email} required />
        {/* <input type="password" id="Password" name="Password" className="input-field" placeholder="Password"  required /> */}
        <input type="number" id="MobileNo" name="MobileNo" className="input-field" placeholder="Mobile No" onChange={handleChange} value={employee.MobileNo} required />
        
      
        <label>
          <input type="checkbox" id="IsActive" name="IsActive" onChange={handleChange} className="checkbox" checked={employee.IsActive}  value={employee.IsActive}/>
          Active
        </label>
        <label>
          <input type="checkbox" id="IsDeleted" name="IsDeleted" onChange={handleChange} className="checkbox" checked={employee.IsDeleted} value={employee.IsDeleted} />
          Deleted
        </label>

       
        <select id="EmployeeType" name="EmployeeType" onChange={handleChange} className="select-field"  value={employee.EmployeeType} required>
          <option value="FULLTIME">Full-Time</option>
          <option value="PARTTIME">Part-Time</option>
          <option value="CONTRACT">Contract</option>
        </select>

        <input type="number" id="Salary" name="Salary" className="input-field" onChange={handleChange} placeholder="Salary" value={employee.Salary} required />

        
        <select id="Role" name="Role" onChange={handleChange} className="select-field" value={employee.Role}>
          <option value="">Select Role</option>
          <option value="123e4567-e89b-12d3-a456-426614174000">Admin</option>
          <option value="789e4567-e89b-12d3-a456-426614174111">Manager</option>
        </select>

        
        <select id="TeamLeader" name="TeamLeader" onChange={handleChange} className="select-field" value={employee.TeamLeader}>
          <option value="">Select Team Leader</option>
          <option value="567e4567-e89b-12d3-a456-426614174222">John Doe</option>
          <option value="987e4567-e89b-12d3-a456-426614174333">Jane Smith</option>
        </select>

        <input type="number" id="TotalAvailablePaidLeave" onChange={handleChange} name="TotalAvailablePaidLeave" value={employee.TotalAvailablePaidLeave} className="input-field" placeholder="Total Available Paid Leave"  required />
        <input type="number" id="TotalPaidLeave" onChange={handleChange} name="TotalPaidLeave" className="input-field" value={employee.TotalPaidLeave} placeholder="Total Paid Leave"  required />
        <input type="number" id="TotalUnpaidLeave" onChange={handleChange} name="TotalUnpaidLeave" className="input-field" value={employee.TotalUnpaidLeave} placeholder="Total Unpaid Leave"  required />
        <input type="number" id="TotalAvailableOptionalLeave" onChange={handleChange} name="TotalAvailableOptionalLeave" value={employee.TotalAvailableOptionalLeave} className="input-field" placeholder="Total Available Optional Leave"  required />

        <input type="text" id="Address" name="Address" onChange={handleChange} value={employee.Address} className="input-field" placeholder="Address" />
        <input type="date" id="Birthdate" name="Birthdate" onChange={handleChange} value={employee.Birthdate }  className="input-field" required />
        <input type="text" id="Designation" name="Designation" onChange={handleChange} value={employee.Designation} className="input-field" placeholder="Designation" />
        <input type="text" id="EMPCode" name="EMPCode" onChange={handleChange} value={employee.EMPCode} className="input-field" placeholder="EMP Code" />
        <input type="date" id="ResignationDate" name="ResignationDate" onChange={handleChange} value={employee.ResignationDate} className="input-field" />
        <input type="number" id="Category_Id" name="Category_Id" onChange={handleChange} value={employee.Category_Id} className="input-field" placeholder="Category ID" />

        <button type="submit" id="submit-button" className="submit-button">Edit Employee</button>
      </form>
    </div>
  )
}

 


export default EditEmployee