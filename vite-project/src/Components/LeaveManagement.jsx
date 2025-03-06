// // src/components/LeaveManagement.jsx
// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// const LeaveManagement = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [formData, setFormData] = useState({
//     start_date: '',
//     end_date: '',
//     reason: '',
//   });

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/leaves/all');
//       setLeaves(response.data);
//     } catch (error) {
//       console.error('Error fetching leaves:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/api/leaves/apply', {
//         employee_id: 1, // Replace with dynamic employee ID
//         ...formData,
//       });
//       fetchLeaves(); // Refresh the list after applying
//     } catch (error) {
//       console.error('Error applying for leave:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Leave Management</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="date"
//           name="start_date"
//           value={formData.start_date}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="end_date"
//           value={formData.end_date}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="reason"
//           value={formData.reason}
//           onChange={handleChange}
//           placeholder="Reason for leave"
//           required
//         />
//         <button type="submit">Apply for Leave</button>
//       </form>
//       <h3>Leave Applications</h3>
//       <ul>
//         {leaves.map((leave) => (
//           <li key={leave.id}>
//             {leave.start_date} to {leave.end_date}: {leave.reason} ({leave.status})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeaveManagement;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const LeaveManagement = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [formData, setFormData] = useState({
//     start_date: '',
//     end_date: '',
//     reason: '',
//   });

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/leaves/all');
//       setLeaves(response.data);
//     } catch (error) {
//       console.error('Error fetching leaves:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:3000/leave/apply', {
//         employee_id: 1, // Ensure this is a valid employee ID from your DB
//         ...formData,
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       console.log("Leave applied:", response.data);
//       fetchLeaves(); // Refresh leave list
//       setFormData({ start_date: '', end_date: '', reason: '' }); // Reset form
//     } catch (error) {
//       console.error("Error applying for leave:", error.response?.data || error.message);
//     }
//   };
  

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Leave Management</h2>

//       {/* Leave Application Form */}
//       <div className="card shadow p-4 mb-4">
//         <h4 className="mb-3">Apply for Leave</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">EMPCode</label>
//             <input
//               type="text"
//               className="form-control"
//               name="EMPCode"
//               value={formData.EMPCode}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Start Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">End Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Reason</label>
//             <textarea
//               className="form-control"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               placeholder="Reason for leave"
//               required
//             />
//           </div>
//           <button type="submit" onChange={handleSubmit} className="btn btn-primary w-100">Apply for Leave</button>
//         </form>
//       </div>

//       {/* Leave Applications Table */}
//       <div className="card shadow p-4">
//         <h4 className="mb-3">Leave Applications</h4>
//         {leaves.length > 0 ? (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Reason</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaves.map((leave) => (
//                   <tr key={leave.id}>
//                     <td>{leave.id}</td>
//                     <td>{leave.start_date}</td>
//                     <td>{leave.end_date}</td>
//                     <td>{leave.reason}</td>
//                     <td>
//                       <span className={`badge ${leave.status === 'Approved' ? 'bg-success' : leave.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
//                         {leave.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-muted">No leave applications found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaveManagement;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const LeaveManagement = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [formData, setFormData] = useState({
//     EMPCode: '',
//     StartDate: '',
//     EndDate: '',
//     Reason: '',
//   });

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/leaves/all');
//       setLeaves(response.data);
//     } catch (error) {
//       console.error('Error fetching leaves:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:3000/leave/apply', formData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       console.log("Leave applied:", response.data);
//       fetchLeaves(); // Refresh leave list
//       setFormData({ EMPCode: '', StartDate: '', EndDate: '', Reason: '' }); // Reset form
//     } catch (error) {
//       console.error("Error applying for leave:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Leave Management</h2>

//       {/* Leave Application Form */}
//       <div className="card shadow p-4 mb-4">
//         <h4 className="mb-3">Apply for Leave</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">EMPCode</label>
//             <input
//               type="text"
//               className="form-control"
//               name="EMPCode"
//               value={formData.EMPCode}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Start Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="StartDate"
//               value={formData.StartDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">End Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="EndDate"
//               value={formData.EndDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Reason</label>
//             <textarea
//               className="form-control"
//               name="Reason"
//               value={formData.Reason}
//               onChange={handleChange}
//               placeholder="Reason for leave"
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Apply for Leave</button>
//         </form>
//       </div>

//       {/* Leave Applications Table */}
//       <div className="card shadow p-4">
//         <h4 className="mb-3">Leave Applications</h4>
//         {leaves.length > 0 ? (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-dark">
//                 <tr>
//                   <th>EMPCode</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaves.map((leave) => (
//                   <tr key={leave.EMPCode}>
//                     <td>{leave.EMPCode}</td>
//                     <td>{leave.StartDate}</td>
//                     <td>{leave.EndDate}</td>
//                     <td>{leave.Reason}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-muted">No leave applications found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaveManagement;


import { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    EMPCode: '',
    Firstname: '',
    Lastname: '',
    Email:'',
    StartDate: '',
    EndDate: '',
    Reason: '',
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3000/leave/all');
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/leave/apply', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      fetchLeaves(); // Refresh leave list
      setFormData({ EMPCode: '', Firstname: '', Lastname: '', StartDate: '', Email: '', EndDate: '', Reason: '' }); // Reset form
    } catch (error) {
      console.error("Error applying for leave:", error.response?.data || error.message);
    }
  };

  const updateLeaveStatus = async (EMPCode, status) => {
    try {
      await axios.put('http://localhost:3000/leave/update-status', { EMPCode, status });
      fetchLeaves(); // Refresh leave list
    } catch (error) {
      console.error(`Error updating leave status:`, error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Management</h2>

      {/* Leave Application Form */}
      {/* <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Apply for Leave</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">EMPCode</label>
            <input
              type="text"
              className="form-control"
              name="EMPCode"
              value={formData.EMPCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="Firstname"
              value={formData.Firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="Lastname"
              value={formData.Lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reason</label>
            <textarea
              className="form-control"
              name="Reason"
              value={formData.Reason}
              onChange={handleChange}
              placeholder="Reason for leave"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Apply for Leave</button>
        </form>
      </div> */}

      {/* Leave Applications Table */}
      <div className="card shadow p-4">
        <h4 className="mb-3">Leave Applications</h4>
        {leaves.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>EMPCode</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Start Date</th>
                  <th>Email</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.EMPCode}</td>
                    <td>{leave.Firstname}</td>
                    <td>{leave.Lastname}</td>
                    <td>{leave.StartDate}</td>
                    <td>{leave.Email}</td>
                    <td>{leave.EndDate}</td>
                    <td>{leave.Reason}</td>
                    <td>{leave.Status}</td>
                    <td>
                      <button className="btn btn-success btn-sm" onClick={() => updateLeaveStatus(leave.EMPCode,'Accepted')}>Accept</button>
                      <button className="btn btn-danger btn-sm ms-2" onClick={() => updateLeaveStatus(leave.EMPCode,'Declined')}>Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No leave applications found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;

// // lrsg habm jwem a9tfcgsp


// import { useState, useEffect } from "react";
// import axios from "axios";

// const LeaveManagement = ({ userRole, userId }) => {
//   const [leaves, setLeaves] = useState([]);
//   const [formData, setFormData] = useState({
//     StartDate: "",
//     Lastname:"",
//     Firstname:"",
//     Email:"",
//     EndDate: "",
//     Reason: "",
//   });

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/leave/all");
//       setLeaves(response.data);
//     } catch (error) {
//       console.error("Error fetching leaves:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:3000/leave/apply",
//         { ...formData, EMPCode: userId },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       fetchLeaves(); // Refresh leave list
//       setFormData({ Firstname:"",Lastname:"",StartDate: "",Email:"", EndDate: "", Reason: "" }); // Reset form
//     } catch (error) {
//       console.error(
//         "Error applying for leave:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const updateLeaveStatus = async (EMPCode, status) => {
//     try {
//       await axios.put("http://localhost:3000/leave/update-status", {
//         EMPCode,
//         status,
//       });
//       fetchLeaves();
//     } catch (error) {
//       console.error(
//         `Error updating leave status:`,
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Leave Management</h2>

//       {/* Show Apply for Leave Form only for Employees */}
//       {userRole === "employee" && (
//         <div className="card shadow p-4 mb-4">
//           <h4 className="mb-3">Apply for Leave</h4>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">EMPCode</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="EMPCode"
//                 value={formData.EMPCode}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Firstname</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="Firstname"
//                 value={formData.Firstname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Lastname</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="Lastname"
//                 value={formData.Lastname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="Email"
//                 value={formData.Emailf}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">StartDate</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="StartDate"
//                 value={formData.StartDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">EndDate</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="EndDate"
//                 value={formData.EndDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Reason</label>
//               <textarea
//                 className="form-control"
//                 name="Reason"
//                 value={formData.Reason}
//                 onChange={handleChange}
//                 placeholder="Reason for leave"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Apply for Leave
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Show Leave Management Table only for Admins */}
//       {userRole === "admin" && (
//         <div className="card shadow p-4">
//           <h4 className="mb-3">Leave Applications</h4>
//           {leaves.length > 0 ? (
//             <div className="table-responsive">
//               <table className="table table-bordered table-striped">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>EMPCode</th>
//                     <th>Start Date</th>
//                     <th>End Date</th>
//                     <th>Reason</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {leaves.map((leave, index) => (
//                     <tr key={index}>
//                       <td>{leave.EMPCode}</td>
//                       <td>{leave.StartDate}</td>
//                       <td>{leave.EndDate}</td>
//                       <td>{leave.Reason}</td>
//                       <td>{leave.Status}</td>
//                       <td>
//                         <button
//                           className="btn btn-success btn-sm"
//                           onClick={() => updateLeaveStatus(leave.EMPCode, "Accepted")}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           className="btn btn-danger btn-sm ms-2"
//                           onClick={() => updateLeaveStatus(leave.EMPCode, "Declined")}
//                         >
//                           Decline
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-muted">No leave applications found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveManagement;



