

// // // eslint-disable-next-line no-unused-vars
// import  { useState } from "react";
// import "./style.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [values, setValues] = useState({
//         email: "",
//         password: ""
//     });
//     const navigate = useNavigate()
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:3000/auth/adminlogin", 
//                 { Email: values.email, Password: values.password }, 
//                 { 
//                     headers: { "Content-Type": "application/json" },
//                     withCredentials: true, 
//                 }
//             );

//             // console.log(response.data);
            
//             if (response.data.loginStatus) {
//                 localStorage.setItem("valid",true)
//                 alert("Login Successful!");
//                 navigate('/dashboard')
//             } else {
//                 alert(response.data.Error || "Invalid Credentials");
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             alert("Login failed. Please check your credentials and try again.");
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
//             <div className="p-3 rounded w-25 border loginForm">
//                 <h2>Login Page</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email:</strong></label>
//                         <input
//                             type="email"
//                             name="email"
//                             autoComplete="off"
//                             placeholder="Enter Email"
//                             className="form-control rounded-0"
//                             onChange={(e) => setValues({ ...values, email: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password:</strong></label>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter Password"
//                             className="form-control rounded-0"
//                             onChange={(e) => setValues({ ...values, password: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">Log in</button>
//                     <div className="mb-1">
//                         <input type="checkbox" name="tick" id="tick" className="me-2" />
//                         <label htmlFor="tick"><strong>Agree with terms & conditions</strong></label>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;






// // eslint-disable-next-line no-unused-vars
import  { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [values, setValues] = useState({
        Email: "",
        Password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    axios.defaults.withCredentials=true;
    const handleSubmit = async (event) => {
        event.preventDefault();

       

        try {
            console.log("Sending Data:",values);
            const response = await axios.post('http://localhost:3000/auth/adminlogin',
                values,
                {headers: {'Content-Type':'application/json'}}
            );
            console.log("Login Response:",response.data)

            if(response.data.loginStatus){
                localStorage.setItem("valid",true);
                const userId=response.data.Id;

                if(userId){
                    navigate(`/dashboard/${userId}`);
                } else {
                    setError("User ID not found in response");
                }
            } else {
                setError(response.data.Error || "Invalid Credentials");
            }
        } catch(error){
            console.error("Login Error:",error.response ? error.response.data : error.message);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="Email"><strong>Email:</strong></label>
                        <input type="email" name='Email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({...values, Email : e.target.value})} 
                            className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor="Password"><strong>Password:</strong></label>
                        <input type="password" name='Password' placeholder='Enter Password'
                            onChange={(e) => setValues({...values, Password : e.target.value})} 
                            className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'> 
                        <input type="checkbox" name="tick" id="tick" className='me-2'/>
                        <label htmlFor="tick">You are Agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
