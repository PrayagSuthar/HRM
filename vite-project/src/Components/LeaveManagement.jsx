

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


