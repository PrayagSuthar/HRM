// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// import React from 'react'

// const App =() => {
//   return (
//     <div>
//       App
//       <form action="">
//         <input type="text" />Hello
          
//       </form>
//     </div>
//   )
// }

// export default App



import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const menuItems = [
  "Dashboard", "My Leave/WFH", "Attendance", "Timesheet", "Assets Request",
  "Assets Policy", "Privacy & Policy", "Salary Slip", "My Team"
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 240 : 60 }}
        className="bg-gray-800 text-white p-3 overflow-hidden"
      >
        <button
          className="block text-gray-400 mb-5 ml-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="text-sm py-2 px-2 hover:bg-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-500 text-white">CLOCK OUT</Button>
            <div className="flex items-center">
              <FaUserCircle size={24} className="text-gray-600 mr-2" />
              <span>Hi, Manan Suthar</span>
            </div>
          </div>
        </header>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { label: "Total Attend", value: 23 },
            { label: "Unap Leave", value: 0 },
            { label: "Pend Leave", value: 0 },
            { label: "Birthday", value: 0 }
          ].map((item, index) => (
            <Card key={index} className="p-2 bg-white">
              <CardContent className="text-center">
                <p className="font-bold text-gray-600">{item.label}</p>
                <p className="text-2xl text-blue-600">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardContent>
              <h2 className="font-bold mb-2">Leave Balance</h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b">Leave Type</th>
                    <th className="border-b">Issue</th>
                    <th className="border-b">Used</th>
                    <th className="border-b">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {["Paid Leave", "Unpaid Leave", "Optional Leave"].map(
                    (type, index) => (
                      <tr key={index}>
                        <td className="border-b p-2">{type}</td>
                        <td className="border-b p-2">{index === 2 ? 12 : 0}</td>
                        <td className="border-b p-2">0</td>
                        <td className="border-b p-2">{index === 2 ? 12 : 0}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent>
              <h2 className="font-bold mb-2">Upcoming Holidays</h2>
              <p>No Data Found</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
