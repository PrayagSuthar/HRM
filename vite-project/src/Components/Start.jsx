// eslint-disable-next-line no-unused-vars
import React from "react";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios";

const Start = () => {
    const navigate=useNavigate()
  // useEffect(() => {
  //   axios.get('http://localhost:3000/verify')
  //   .then(result => {
  //     if(result.data.Status){
  //       if(result.data.Role === "123e4567-e89b-12d3-a456-426614174000"){
  //         navigate('/dashboard')
  //       } else {
  //         navigate(`/employee_detail/${result.data.Id}`)
  //       }
  //     } 
  //   }).catch(err => console.log(err))
  // },[])

 
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status){
        if(result.data.Role === "123e4567-e89b-12d3-a456-426614174000"){
          navigate('/dashboard')
        } else {
          navigate(`/employee_detail/${result.data.Id}`)
        }
      } 
    }).catch(err => console.log(err))
  },[])
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={() => {navigate('/employee_login')}}>
            Employee
          </button>
          <button type="button" className="btn btn-success" onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
