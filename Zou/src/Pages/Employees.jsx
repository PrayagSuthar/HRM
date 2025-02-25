import { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.Id}>{emp.Firstname} {emp.Lastname}</li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;