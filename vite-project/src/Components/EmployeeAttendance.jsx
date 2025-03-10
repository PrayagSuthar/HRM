


import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeAttendance = () => {
  const { Id } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, [Id]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/attendance/${Id}`);
      setAttendance(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load attendance records.");
      setLoading(false);
    }
  };

  const markAttendance = async (action) => {
    try {
      const endpoint = action === "Check-in"
        ? "http://localhost:3000/attendance/mark/checkin"
        : "http://localhost:3000/attendance/mark/checkout";

      await axios.post(endpoint, { Id });
      setStatus(action);
      fetchAttendance();
    } catch (err) {
      setError("Failed to mark attendance.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Attendance</h2>
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Mark Attendance</h4>
        <button className="btn btn-success w-100 mb-2" onClick={() => markAttendance("Check-in")} disabled={status === "Checked-in"}>
          Check-in
        </button>
        <button className="btn btn-danger w-100" onClick={() => markAttendance("Check-out")} disabled={status === "Checked-out"}>
          Check-out
        </button>
      </div>
      <div className="card shadow p-4">
        <h4 className="mb-3">Attendance Records</h4>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : attendance.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Check-in Time</th>
                  <th>Check-out Time</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr key={index}>
                    <td>{record.Date}</td>
                    <td>{record.CheckInTime || "N/A"}</td>
                    <td>{record.CheckOutTime || "N/A"}</td>
                    {/* <td>{record.TotalHours || "N/A"}</td> */}
                    <td>{record.TotalHours !== null ? record.TotalHours.toFixed(2) : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
