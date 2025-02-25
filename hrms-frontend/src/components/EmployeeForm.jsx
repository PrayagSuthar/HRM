import { useState } from 'react';
import { createEmployee } from '../api/employeeApi';

function EmployeeForm() {
  const [employee, setEmployee] = useState({});

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createEmployee(employee);
      alert('Employee created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating employee');
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <input
        type="text"
        name="Firstname"
        placeholder="Firstname"
        onChange={handleChange}
      />
      <input
        type="text"
        name="Lastname"
        placeholder="Lastname"
        onChange={handleChange}
      />
      <input
        type="email"
        name="Email"
        placeholder="Email"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EmployeeForm;