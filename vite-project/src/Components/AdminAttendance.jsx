import  { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        fetchAllAttendance();
    }, []);

    const fetchAllAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:3000/attendance/all');
            setAttendanceRecords(response.data);
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h3>All Employees Attendance Records</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Date</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.Firstname} {entry.Lastname}</td>
                            <td>{new Date(entry.CreatedAt).toLocaleDateString()}</td>
                            <td>{entry.CheckIn ? new Date(entry.CheckIn).toLocaleTimeString() : 'N/A'}</td>
                            <td>{entry.CheckOut ? new Date(entry.CheckOut).toLocaleTimeString() : 'N/A'}</td>
                            <td>{entry.WorkingHours ? entry.WorkingHours.toFixed(2) : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAttendance;
