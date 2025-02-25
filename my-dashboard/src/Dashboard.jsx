// import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>HRM System Dashboard</h1>
      </header>

      <nav className="dashboard-sidebar">
        <ul>
          <li>Employee Management</li>
          <li>Leave Tracking</li>
          <li>Payroll</li>
          <li>Settings</li>
        </ul>
      </nav>

      <main className="dashboard-content">
        <h2>Welcome to the HRM Dashboard</h2>
        <p>View and manage your employees effectively.</p>
      </main>
    </div>
  );
};

export default Dashboard;
