
import { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveManagement2 = () => {
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
      <div className="card shadow p-4 mb-4">
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
      </div>

      {/* Leave Applications Table */}
      {/* <div className="card shadow p-4">
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
      </div> */}
    </div>
  );
};

export default LeaveManagement2;