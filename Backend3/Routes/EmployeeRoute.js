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

   
    const token = jwt.sign({ role: "employee", email: user.Email , Id:user.Id} ,"jwt_secret_key", { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.json({ loginStatus: true, Id:user.Id});
   
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ loginStatus: false, Error: "Database error" });
  }
});



  router.get('/detail/:Id', async (req, res) => {
    try {
        const { Id } = req.params;

        
        if (!/^[0-9a-fA-F-]{36}$/.test(Id)) {
            return res.status(400).json({ Status: false, Error: "Invalid Employee ID format" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.UniqueIdentifier, Id)
            .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");

       

        return res.json(result.recordset[0]); 

    } catch (err) {
        console.error("Query Error:", err);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});

router.get('/employee-dashboard/:Id', async (req, res) => {
  try {
      const { Id } = req.params;

      
      if (!/^[0-9a-fA-F-]{36}$/.test(Id)) {
          return res.status(400).json({ Status: false, Error: "Invalid Employee ID format" });
      }

      const pool = await poolPromise;
      const result = await pool.request()
          .input('Id', sql.UniqueIdentifier, Id)
          .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");

      

      return res.json(result.recordset[0]); 

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