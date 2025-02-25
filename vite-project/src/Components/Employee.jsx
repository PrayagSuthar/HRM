// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        // console.log(result.data)
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete= (Id) => {
    axios.delete(`http://localhost:3000/auth/delete_employee/${Id}`)
    .then(result => {
      if(result.data.Status){
        window.location.reload()
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Password</th>
              <th>MobileNo</th>
              <th>Profile</th>
              <th>IsActive</th>
              <th>IsDeleted</th>
              <th>EmployeeType</th>
              <th>Salary</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Role</th>
              <th>TotalAvailablePaidLeave</th>
              <th>TotalPaidLeave</th>
              <th>TotalUnpaidLeave</th>
              <th>TeamLeader</th>
              <th>TotalAvailableOptionalLeave</th>
              <th>Address</th>
              <th>Birthdate</th>
              <th>Designation</th>
              <th>EMPCode</th>
              <th>ResignationDate</th>
              <th>Category_Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.Firstname}>
                <td>{e.Firstname}</td>
                <td>{e.Lastname}</td>
                <td>{e.Email}</td>
                <td>{e.Password}</td>
                <td>{e.MobileNo}</td>
                <td>
                  <img src={`/Images/${e.Profile}` + e.Profile} alt="" />
                </td>
                <td>{e.IsActive}</td>
                <td>{e.IsDeleted}</td>
                <td>{e.EmployeeType}</td>
                <td>{e.Salary}</td>
                <td>{e.CreatedAt}</td>
                <td>{e.UpdatedAt}</td>
                <td>{e.Role}</td>
                <td>{e.TotalAvailablePaidLeave}</td>
                <td>{e.TotalPaidLeave}</td>
                <td>{e.TotalUnpaidLeave}</td>
                <td>{e.TeamLeader}</td>
                <td>{e.TotalAvailableOptionalLeave}</td>
                <td>{e.Address}</td>
                <td>{e.Birthdate}</td>
                <td>{e.Designation}</td>
                <td>{e.EMPCode}</td>
                <td>{e.ResignationDate}</td>
                <td>{e.Category_Id}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.Id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
