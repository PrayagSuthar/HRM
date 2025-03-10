
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

      fetchLeaves(); 
      setFormData({ EMPCode: '', Firstname: '', Lastname: '', StartDate: '', Email: '', EndDate: '', Reason: '' }); // Reset form
    } catch (error) {
      console.error("Error applying for leave:", error.response?.data || error.message);
    }
  };

  const updateLeaveStatus = async (EMPCode, status) => {
    try {
      await axios.put('http://localhost:3000/leave/update-status', { EMPCode, status });
      fetchLeaves(); 
    } catch (error) {
      console.error(`Error updating leave status:`, error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leave Management</h2>

      
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

      
    </div>
  );
};

export default LeaveManagement2;