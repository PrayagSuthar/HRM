// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// const EmployeeAttendance = ({ employeeId }) => {
//     const [attendance, setAttendance] = useState([]);
//     const [checkedIn, setCheckedIn] = useState(false);

//     useEffect(() => {
//         fetchAttendance();
//     }, []);

//     const fetchAttendance = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/attendance/employee/${employeeId}`);
//             setAttendance(response.data);

//             // Check if employee is currently checked in
//             if (response.data.length > 0 && !response.data[0].CheckOut) {
//                 setCheckedIn(true);
//             }
//         } catch (error) {
//             console.error('Error fetching attendance:', error);
//         }
//     };

//     const handleCheckIn = async () => {
//         try {
//             await axios.post('http://localhost:3000/attendance/checkin', { employeeId });
//             setCheckedIn(true);
//             fetchAttendance();
//         } catch (error) {
//             console.error('Error checking in:', error);
//         }
//     };

//     const handleCheckOut = async () => {
//         try {
//             await axios.post('http://localhost:3000/attendance/checkout', { employeeId });
//             setCheckedIn(false);
//             fetchAttendance();
//         } catch (error) {
//             console.error('Error checking out:', error);
//         }
//     };

//     return (
//         <div className="container mt-3">
//             <h3>Attendance Management</h3>
//             <button className="btn btn-success me-2" onClick={handleCheckIn} disabled={checkedIn}>
//                 Check-in
//             </button>
//             <button className="btn btn-danger" onClick={handleCheckOut} disabled={!checkedIn}>
//                 Check-out
//             </button>
//             <hr />
//             <h4>Attendance Records</h4>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Check-In</th>
//                         <th>Check-Out</th>
//                         <th>Working Hours</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {attendance.map((entry, index) => (
//                         <tr key={index}>
//                             <td>{new Date(entry.CreatedAt).toLocaleDateString()}</td>
//                             <td>{entry.CheckIn ? new Date(entry.CheckIn).toLocaleTimeString() : 'N/A'}</td>
//                             <td>{entry.CheckOut ? new Date(entry.CheckOut).toLocaleTimeString() : 'N/A'}</td>
//                             <td>{entry.WorkingHours ? entry.WorkingHours.toFixed(2) : 'N/A'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default EmployeeAttendance;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const EmployeeAttendance = ({ employeeId }) => {
//     const [attendance, setAttendance] = useState([]);
//     const [checkedIn, setCheckedIn] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (employeeId) {
//             fetchAttendance();
//         }
//     }, [employeeId]);

//     const fetchAttendance = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/attendance/employee/${employeeId}`);
//             setAttendance(response.data);

//             // Check if the employee is currently checked in (CheckOut is NULL)
//             if (response.data.length > 0 && !response.data[0].CheckOut) {
//                 setCheckedIn(true);
//             } else {
//                 setCheckedIn(false);
//             }
//         } catch (error) {
//             console.error('Error fetching attendance:', error.response?.data || error.message);
//         }
//     };

//     const handleCheckIn = async () => {
//         if (!employeeId) {
//             console.error('Error: Employee ID is missing.');
//             return;
//         }

//         setLoading(true);
//         try {
//             await axios.post('http://localhost:3000/attendance/checkin', { employeeId });
//             setCheckedIn(true);
//             fetchAttendance();
//         } catch (error) {
//             console.error('Error checking in:', error.response?.data || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCheckOut = async () => {
//         if (!employeeId) {
//             console.error('Error: Employee ID is missing.');
//             return;
//         }

//         setLoading(true);
//         try {
//             await axios.post('http://localhost:3000/attendance/checkout', { employeeId });
//             setCheckedIn(false);
//             fetchAttendance();
//         } catch (error) {
//             console.error('Error checking out:', error.response?.data || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-3">
//             <h3>Attendance Management</h3>
//             <button className="btn btn-success me-2" onClick={handleCheckIn} disabled={checkedIn || loading}>
//                 {loading ? 'Processing...' : 'Check-in'}
//             </button>
//             <button className="btn btn-danger" onClick={handleCheckOut} disabled={!checkedIn || loading}>
//                 {loading ? 'Processing...' : 'Check-out'}
//             </button>
//             <hr />
//             <h4>Attendance Records</h4>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Check-In</th>
//                         <th>Check-Out</th>
//                         <th>Working Hours</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {attendance.length === 0 ? (
//                         <tr>
//                             <td colSpan="4" className="text-center">No records found</td>
//                         </tr>
//                     ) : (
//                         attendance.map((entry, index) => (
//                             <tr key={index}>
//                                 <td>{new Date(entry.CreatedAt).toLocaleDateString()}</td>
//                                 <td>{entry.CheckIn ? new Date(entry.CheckIn).toLocaleTimeString() : 'N/A'}</td>
//                                 <td>{entry.CheckOut ? new Date(entry.CheckOut).toLocaleTimeString() : 'N/A'}</td>
//                                 <td>{entry.WorkingHours ? entry.WorkingHours.toFixed(2) : 'N/A'}</td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default EmployeeAttendance;


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

const employeeId = response.data.Id
const EmployeeAttendance = ({ employeeId }) => {
    const navigate=useNavigate()
    // const {userId: employeeId} = useParams()
    
    const [attendance, setAttendance] = useState([]);
    const [checkedIn, setCheckedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Debugging: Ensure employeeId is being passed correctly
    useEffect(() => {
        console.log("Employee ID in EmployeeAttendance:", employeeId);
        if (employeeId) {
            fetchAttendance();
        }
    }, [employeeId]);

    // Fetch Attendance Records
    const fetchAttendance = async () => {
        if (!employeeId) return;

        try {
            const response = await axios.get(`http://localhost:3000/attendance/employee/${employeeId}`);
            setAttendance(response.data);

            // Check if the last record has CheckOut = NULL (means still checked in)
            const lastRecord = response.data[0];  
            setCheckedIn(lastRecord && !lastRecord.CheckOut);
        } catch (error) {
            console.error("Error fetching attendance:", error.response?.data || error.message);
        }
    };

    // Handle Check-In
    const handleCheckIn = async () => {
        if (!employeeId) {
            alert("Employee ID is missing!");
            return;
        }
        setLoading(true);

        try {
            await axios.post("http://localhost:3000/attendance/checkin", { employeeId });
            setCheckedIn(true);
            fetchAttendance();
        } catch (error) {
            console.error("Check-in failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Check-Out
    const handleCheckOut = async () => {
        if (!employeeId) {
            alert("Employee ID is missing!");
            return;
        }
        setLoading(true);

        try {
            await axios.post("http://localhost:3000/attendance/checkout", { employeeId });
            setCheckedIn(false);
            fetchAttendance();
        } catch (error) {
            console.error("Check-out failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <h3>Attendance Management</h3>
            <div className="mb-3">
                <button className="btn btn-success me-2" onClick={handleCheckIn} disabled={checkedIn || loading}>
                    {loading ? "Processing..." : "Check-in"}
                </button>
                <button className="btn btn-danger" onClick={handleCheckOut} disabled={checkedIn || loading}>
                    {loading ? "Processing..." : "Check-out"}
                </button>
            </div>

            <hr />
            <h4>Attendance Records</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No records found</td>
                        </tr>
                    ) : (
                        attendance.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.CreatedAt).toLocaleDateString()}</td>
                                <td>{entry.CheckIn ? new Date(entry.CheckIn).toLocaleTimeString() : "N/A"}</td>
                                <td>{entry.CheckOut ? new Date(entry.CheckOut).toLocaleTimeString() : "N/A"}</td>
                                <td>{entry.WorkingHours ? entry.WorkingHours.toFixed(2) : "N/A"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeAttendance;
