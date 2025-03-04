// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";


// const EmployeeDashboard = () => {
//     return (
//         <div className="container mt-4">
//             <header className="bg-primary text-white text-center p-3 rounded">
//                 <h1>Employee Dashboard</h1>
//             </header>
//             <nav className="mt-3">
//                 <ul className="nav nav-pills justify-content-center">
//                     <li className="nav-item">
//                         <a className="nav-link active" href="#profile">Profile</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#attendance">Attendance</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#performance">Performance</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#leave">Leave Management</a>
//                     </li>
//                 </ul>
//             </nav>
//             <main className="mt-4">
//                 <section id="profile" className="card p-3 mb-3 shadow-sm">
//                     <h2>Profile Information</h2>
//                     {/* Employee profile details go here */}
//                 </section>
//                 <section id="attendance" className="card p-3 mb-3 shadow-sm">
//                     <h2>Attendance Records</h2>
//                     {/* Attendance details go here */}
//                 </section>
//                 <section id="performance" className="card p-3 mb-3 shadow-sm">
//                     <h2>Performance Metrics</h2>
//                     {/* Performance metrics go here */}
//                 </section>
//                 <section id="leave" className="card p-3 mb-3 shadow-sm">
//                     <h2>Leave Management</h2>
//                     {/* Leave management features go here */}
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default EmployeeDashboard;


// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link,Outlet,useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials=true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status){
        localStorage.removeItem("valid")
        navigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Centillion 
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {/* <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li> */}
              {/* <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li> */}
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <Link to="/dashboard/leave" className="nav-link px-0 align-middle text-white">
  <i className="fs-4 bi-calendar-check ms-2"></i>
  <span className="ms-2 d-none d-sm-inline">Leave Management</span>
</Link>

              
              <li className="w-100"  onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Emoployee Management System</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard