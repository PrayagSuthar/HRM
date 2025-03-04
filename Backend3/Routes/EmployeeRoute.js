import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { poolPromise, sql } from "../utils/db.js";
import multer from "multer";
// import con from "../utils/db.js"
import path from "path"
import {v4 as uuidv4} from "uuid"
import validate from 'uuid-validate';
import fs from 'fs';
import { fileURLToPath } from "url";


const router=express.Router()

// router.post("/employee_login", async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ loginStatus: false, Error: "Email and password required" });
//     }
  
//     try {
//       const pool = await poolPromise;
//       const result = await pool
//         .request()
//         .input("email", sql.NVarChar(100), email)
//         .input("password",sql.NVarChar(255),password)
//         .query("SELECT * FROM EmployeeInfo WHERE Email = @Email and Password=@Password");
  
//       if (result.recordset.length === 0) {
//         return res.json({ loginStatus: false, Error: "Invalid email or or  password" });
//       }
  
//       const user = result.recordset[0];
  
//       // Check password using bcrypt
//       // const isMatch = await bcrypt.compare(Password, user.Password);
//       // if (!isMatch) {
//       //   return res.json({ loginStatus: false, Error: "Invalid email or password" });
//       // }
  
//       // Generate JWT Token
//       const token = jwt.sign({ role: "789e4567-e89b-12d3-a456-426614174111", email: user.Email  }, "employee_secret_key", { expiresIn: "1d" });
  
//       res.cookie("token", token, { httpOnly: true, secure: false });
//       return res.json({ loginStatus: true, word:result,Id:result[0].Id});
     
//     } catch (err) {
//       console.error("Database query error:", err);
//       return res.status(500).json({ loginStatus: false, Error: "Database error" });
//     }
//   });

router.post("/employee_login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ loginStatus: false, Error: "Email and password required" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar(100), Email)
      .input("Password",sql.NVarChar(255),Password)
      .query("SELECT * FROM EmployeeInfo WHERE Email = @Email and Password=@Password");

    if (result.recordset.length === 0) {
      return res.json({ loginStatus: false, Error: "Invalid email or or  password" });
    }

    const user = result.recordset[0];

    // Check password using bcrypt
    // const isMatch = await bcrypt.compare(Password, user.Password);
    // if (!isMatch) {
    //   return res.json({ loginStatus: false, Error: "Invalid email or password" });
    // }

    // Generate JWT Token
    const token = jwt.sign({ role: "employee", email: user.Email , Id:user.Id} ,"jwt_secret_key", { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.json({ loginStatus: true, Id:user.Id});
   
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ loginStatus: false, Error: "Database error" });
  }
});

  // router.get('/detail/:Id', async (req, res) => {
  //   try {
  //       const Id = req.params.Id;
  //       const pool = await poolPromise;
        
  //       const result = await pool.request()
  //           .input('Id', sql.UniqueIdentifier, Id) // Declare the @Id parameter properly
  //           .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");
  
  //       return res.json( result.recordset );
  //   } catch (err) {
  //       console.error("Query Error:", err);
  //       return res.status(500).json({ Status: false, Error: "Employee not found" });

  //   }
  // });

  router.get('/detail/:Id', async (req, res) => {
    try {
        const { Id } = req.params;

        // Validate if the Id is a valid GUID
        if (!/^[0-9a-fA-F-]{36}$/.test(Id)) {
            return res.status(400).json({ Status: false, Error: "Invalid Employee ID format" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.UniqueIdentifier, Id)
            .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");

        // if (result.recordset.length === 0) {
        //     return res.status(404).json({ Status: false, Error: "Employee not found" });
        // }

        return res.json(result.recordset[0]); // Return single employee object

    } catch (err) {
        console.error("Query Error:", err);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});

router.get('/employee-dashboard/:Id', async (req, res) => {
  try {
      const { Id } = req.params;

      // Validate if the Id is a valid GUID
      if (!/^[0-9a-fA-F-]{36}$/.test(Id)) {
          return res.status(400).json({ Status: false, Error: "Invalid Employee ID format" });
      }

      const pool = await poolPromise;
      const result = await pool.request()
          .input('Id', sql.UniqueIdentifier, Id)
          .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");

      // if (result.recordset.length === 0) {
      //     return res.status(404).json({ Status: false, Error: "Employee not found" });
      // }

      return res.json(result.recordset[0]); // Return single employee object

  } catch (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});

  
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

export {router as EmployeeRouter}