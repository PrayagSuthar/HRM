// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: ''
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email format').required('Email is required'),
//             password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const response = await axios.post('http://localhost:5000/api/auth/login', values);
//                 if (response.data.role === 'ADMIN') {
//                     navigate('/admin-dashboard');
//                 } else {
//                     navigate('/employee-dashboard');
//                 }
//             } catch (error) {
//                 alert('Invalid credentials');
//             }
//         }
//     });

//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <label>Email:</label>
//             <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
//             {formik.errors.email && <div>{formik.errors.email}</div>}
            
//             <label>Password:</label>
//             <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
//             {formik.errors.password && <div>{formik.errors.password}</div>}
            
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default LoginForm;

// eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const LoginForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email format').required('Required'),
//       password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label>Email:</label>
//       <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
//       {formik.errors.email && <div>{formik.errors.email}</div>}

//       <label>Password:</label>
//       <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
//       {formik.errors.password && <div>{formik.errors.password}</div>}

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
