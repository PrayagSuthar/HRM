// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
// import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
// import Dashboard from './Components/Dashboard'
// import Home from './Components/Home'
// import Employee from './Components/Employee'
// import Category from './Components/Category'
// import Profile from './Components/Profile'
// import AddCategory from './Components/AddCategory'
// import AddEmployee from './Components/AddEmployee'
// import EditEmployee from './Components/EditEmployee'
// import Start from './Components/Start'
// import EmployeeLogin from './Components/EmployeeLogin'
// import EmployeeDetail from './Components/EmployeeDetail'
// import PrivateRoute from './Components/PrivateRoute'
// import LeaveManagement from './Components/LeaveManagement'
// import EmployeeDashboard from './Components/EmployeeDashboard'


// function App() {
  
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={ <Start/>}></Route>
//       <Route path="/adminlogin" element={<Login/>}></Route>
//       <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
//       <Route path='/detail/:Id' element={<EmployeeDetail />}></Route>
//       <Route path = '/employee-dashboard/:Id' element={<EmployeeDashboard /> }></Route>
//       <Route path="/dashboard" element={
//         <PrivateRoute>
//           <Dashboard/>
//         </PrivateRoute>
//         }>
//         <Route path='' element={<Home />}></Route>
//         <Route path='/dashboard/employee' element={<Employee />}></Route>
//         <Route path='/dashboard/category' element={<Category/>}></Route>
//         <Route path='/dashboard/profile' element={<Profile />}></Route>
//         <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
//         <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
//         <Route path='/dashboard/edit_employee/:Id' element={<EditEmployee />}></Route>
//         <Route path='/dashboard/leave' element={<LeaveManagement />}></Route>
//         {/* <Route path='/employee_detail/:Id'></Route> */}
//       </Route>
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import LeaveManagement from './Components/LeaveManagement'
import EmployeeDashboard from './Components/EmployeeDashboard'
import LeaveManagement2 from './Components/LeaveManagement2'
import EmployeeAttendance from './Components/EmployeeAttendance'
import AdminAttendance from './Components/AdminAttendance'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Start />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />
        <Route path='/detail/:Id' element={<EmployeeDetail />} />

        {/* Employee Dashboard with Leave Management Route */}
        <Route path='/employee-dashboard/:Id' element={<EmployeeDashboard />}>
          <Route path="leave-management" element={<LeaveManagement2 />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
        </Route>
        

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add_category' element={<AddCategory />} />
          <Route path='add_employee' element={<AddEmployee />} />
          <Route path='edit_employee/:Id' element={<EditEmployee />} />
          <Route path='leave' element={<LeaveManagement />} />
          <Route path='attendance' element={<AdminAttendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

