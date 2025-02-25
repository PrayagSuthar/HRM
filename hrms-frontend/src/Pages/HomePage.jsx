import { Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';

function HomePage() {
  return (
    <div>
      <h1>HRM Dashboard</h1>
      <Link to="/login">Login</Link>
      <EmployeeList />
    </div>
  );
}

export default HomePage;