import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
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
// import axios from 'axios'
// import {useEffect} from 'react'

function App() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   axios.get('http://localhost:3000/verify')
  //   .then(result => {
  //     if(result.data.Status){
  //       if(result.data.Role === "123e4567-e89b-12d3-a456-426614174000"){
  //         navigate('/dashboard')
  //       } else {
  //         navigate(`/employee_detail/${result.data.Id}`)
  //       }
  //     } else {
  //       navigate('/start')
  //     }
  //   }).catch(err => console.log(err))
  // },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Start/>}></Route>
      <Route path="/adminlogin" element={<Login/>}></Route>
      <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
      <Route path='/detail/:Id' element={<EmployeeDetail />}></Route>
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category/>}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:Id' element={<EditEmployee />}></Route>
        {/* <Route path='/employee_detail/:Id'></Route> */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
