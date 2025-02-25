



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



const router = express.Router();

router.post("/adminlogin", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ loginStatus: false, Error: "Email and password required" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar(100), Email)
      .input("password",sql.NVarChar(255),Password)
      .query("SELECT * FROM EmployeeDetailss WHERE Email = @Email and Password=@Password");

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
    const token = jwt.sign({ role: "admin", email: user.Email ,Id:user.Id}, "jwt_secret_key", { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.json({ loginStatus: true, word:result });
   
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ loginStatus: false, Error: "Database error" });
  }
});


router.post('/add_category', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request()
          .input('name', sql.VarChar(30), req.body.category)
          .query("INSERT INTO Category (name) VALUES (@name)");

      return res.json({ Status: true });
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: err.message });
  }
});

router.get('/category', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Category");

      return res.json({ Status: true, Result: result.recordset});
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../vite-project/public/Images");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadDir); // Use absolute path to avoid errors
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'public/Images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({
//   storage: storage
// })

// router.post('/add_employee', upload.single('Profile'), async (req, res) => {
//   try {
//       const pool = await poolPromise;
//       const employeeId= uuidv4();
//       const role = req.body.Role && validate(req.body.Role) ? req.body.Role: null ;
//       const teamLeader = req.body.TeamLeader && validate(req.body.TeamLeader) ? req.body.TeamLeader : null;
//       // Hash the password before inserting into the database
//       const hashedPassword = await bcrypt.hash(req.body.Password, 10);

//       const result = await pool.request()
//           .input('Id', sql.UniqueIdentifier, employeeId) // Generate a new UniqueIdentifier
//           .input('Firstname', sql.NVarChar(50), req.body.Firstname)
//           .input('Lastname', sql.NVarChar(50), req.body.Lastname)
//           .input('Email', sql.NVarChar(100), req.body.Email)
//           .input('Password', sql.NVarChar(255), hashedPassword)
//           .input('MobileNo', sql.BigInt, req.body.MobileNo)
//           .input('Profile', sql.NVarChar(255), req.file ? req.file.filename : null)
//           .input('IsActive', sql.Bit, req.body.IsActive)
//           .input('IsDeleted', sql.Bit, req.body.IsDeleted)
//           .input('EmployeeType', sql.NVarChar(20), req.body.EmployeeType)
//           .input('Salary', sql.Float, req.body.Salary)
//           .input('CreatedAt', sql.DateTime, new Date()) // Set current date
//           .input('UpdatedAt', sql.DateTime, new Date()) // Set current date
//           .input('Role', sql.UniqueIdentifier, role )
//           .input('TotalAvailablePaidLeave', sql.Int, req.body.TotalAvailablePaidLeave)
//           .input('TotalPaidLeave', sql.Int, req.body.TotalPaidLeave)
//           .input('TotalUnpaidLeave', sql.Int, req.body.TotalUnpaidLeave)
//           .input('TeamLeader', sql.UniqueIdentifier, teamLeader)
//           .input('TotalAvailableOptionalLeave', sql.Int, req.body.TotalAvailableOptionalLeave)
//           .input('Address', sql.NVarChar(255), req.body.Address)
//           .input('Birthdate', sql.Date, req.body.Birthdate)
//           .input('Designation', sql.NVarChar(50), req.body.Designation)
//           .input('EMPCode', sql.NVarChar(10), req.body.EMPCode)
//           .input('ResignationDate', sql.Date, req.body.ResignationDate || null)
//           .input('Category_Id', sql.Int, req.body.Category_Id || null) // Category_Id as FK
//           .query(`INSERT INTO EmployeeInfo (
//                   Id, Firstname, Lastname, Email, Password, MobileNo, Profile, 
//                   IsActive, IsDeleted, EmployeeType, Salary, CreatedAt, UpdatedAt, 
//                   Role, TotalAvailablePaidLeave, TotalPaidLeave, TotalUnpaidLeave, 
//                   TeamLeader, TotalAvailableOptionalLeave, Address, Birthdate, 
//                   Designation, EMPCode, ResignationDate, Category_Id
//               ) 
//               VALUES (
//                   @Id, @Firstname, @Lastname, @Email, @Password, @MobileNo, @Profile, 
//                   @IsActive, @IsDeleted, @EmployeeType, @Salary, @CreatedAt, @UpdatedAt, 
//                   @Role, @TotalAvailablePaidLeave, @TotalPaidLeave, @TotalUnpaidLeave, 
//                   @TeamLeader, @TotalAvailableOptionalLeave, @Address, @Birthdate, 
//                   @Designation, @EMPCode, @ResignationDate, @Category_Id
//               )`);

//       return res.json({ Status: true });

//   } catch (err) {
//       console.error("Query Error:", err);
//       return res.json({ Status: false, Error: "Query Error" });
//   }
// });


router.post('/add_employee', upload.single('Profile'), async (req, res) => {
  try {
      const pool = await poolPromise;
      const employeeId = uuidv4();
      
      console.log("Role before validation:", req.body.Role);
      console.log("TeamLeader before validation:", req.body.TeamLeader);

      const role = req.body.Role && validate(req.body.Role) ? req.body.Role : null;
      const teamLeader = req.body.TeamLeader && validate(req.body.TeamLeader) ? req.body.TeamLeader : null;
      // const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const profilePath = req.file ? `/uploads/${req.file.filename}` : null;

      const result = await pool.request()
          .input('Id', sql.UniqueIdentifier, employeeId)
          .input('Firstname', sql.NVarChar(50), req.body.Firstname)
          .input('Lastname', sql.NVarChar(50), req.body.Lastname)
          .input('Email', sql.NVarChar(100), req.body.Email)
          .input('Password', sql.NVarChar(255), req.body.Password)
          .input('MobileNo', sql.BigInt, req.body.MobileNo)
          .input('Profile', sql.NVarChar(255), profilePath)
          .input('IsActive', sql.Bit, req.body.IsActive)
          .input('IsDeleted', sql.Bit, req.body.IsDeleted)
          .input('EmployeeType', sql.NVarChar(20), req.body.EmployeeType)
          .input('Salary', sql.Float, req.body.Salary)
          .input('CreatedAt', sql.DateTime, new Date())
          .input('UpdatedAt', sql.DateTime, new Date())
          .input('Role', role ? sql.UniqueIdentifier : sql.NVarChar, role)
          .input('TotalAvailablePaidLeave', sql.Int, req.body.TotalAvailablePaidLeave)
          .input('TotalPaidLeave', sql.Int, req.body.TotalPaidLeave)
          .input('TotalUnpaidLeave', sql.Int, req.body.TotalUnpaidLeave)
          .input('TeamLeader', teamLeader ? sql.UniqueIdentifier : sql.NVarChar, teamLeader)
          .input('TotalAvailableOptionalLeave', sql.Int, req.body.TotalAvailableOptionalLeave)
          .input('Address', sql.NVarChar(255), req.body.Address)
          .input('Birthdate', sql.Date, req.body.Birthdate)
          .input('Designation', sql.NVarChar(50), req.body.Designation)
          .input('EMPCode', sql.NVarChar(10), req.body.EMPCode)
          .input('ResignationDate', sql.Date, req.body.ResignationDate || null)
          .input('Category_Id', sql.Int, req.body.Category_Id || null)
          .query(`INSERT INTO EmployeeInfo (
                  Id, Firstname, Lastname, Email, Password, MobileNo, Profile, 
                  IsActive, IsDeleted, EmployeeType, Salary, CreatedAt, UpdatedAt, 
                  Role, TotalAvailablePaidLeave, TotalPaidLeave, TotalUnpaidLeave, 
                  TeamLeader, TotalAvailableOptionalLeave, Address, Birthdate, 
                  Designation, EMPCode, ResignationDate, Category_Id
              ) 
              VALUES (
                  @Id, @Firstname, @Lastname, @Email, @Password, @MobileNo, @Profile, 
                  @IsActive, @IsDeleted, @EmployeeType, @Salary, @CreatedAt, @UpdatedAt, 
                  @Role, @TotalAvailablePaidLeave, @TotalPaidLeave, @TotalUnpaidLeave, 
                  @TeamLeader, @TotalAvailableOptionalLeave, @Address, @Birthdate, 
                  @Designation, @EMPCode, @ResignationDate, @Category_Id
              )`);

      return res.json({ Status: true });

  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
  }
});


router.get('/employee', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM EmployeeInfo");

      return res.json({ Status: true, Result: result.recordset});
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
  }
});

// router.get('/employee/:Id',async(req,res) => {
  
//   try {
//     const Id = req.params.Id;
//     const pool = await poolPromise;
//     const result = await pool.request().query("SELECT * FROM EmployeeInfo WHERE Id = @Id",Id);

//     return res.json({ Status: true, Result: result.recordset});
// } catch (err) {
//     console.error("Query Error:", err);
//     return res.json({ Status: false, Error: "Query Error" });
// }
// })

router.get('/employee/:Id', async (req, res) => {
  try {
      const Id = req.params.Id;
      const pool = await poolPromise;
      
      const result = await pool.request()
          .input('Id', sql.VarChar, Id) // Declare the @Id parameter properly
          .query("SELECT * FROM EmployeeInfo WHERE Id = @Id");

      return res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
  }
});

router.put('/edit_employee/:Id', async (req, res) => {
  try {
      const Id = req.params.Id;
      const pool = await poolPromise;

      const result = await pool.request()
          .input('Id', sql.VarChar, Id)
          .input('Firstname', sql.VarChar, req.body.Firstname)
          .input('Lastname', sql.VarChar, req.body.Lastname)
          .input('Email', sql.VarChar, req.body.Email)
          .input('MobileNo', sql.VarChar, req.body.MobileNo)
          .input('IsActive', sql.Bit, req.body.IsActive)
          .input('IsDeleted', sql.Bit, req.body.IsDeleted)
          .input('EmployeeType', sql.VarChar, req.body.EmployeeType)
          .input('Category_Id', sql.Int, req.body.Category_Id)
          .input('Salary', sql.Decimal, req.body.Salary)
          .input('Role', sql.UniqueIdentifier, req.body.Role) // Ensure this is a valid GUID
          .input('TotalAvailablePaidLeave', sql.Int, req.body.TotalAvailablePaidLeave)
          .input('TotalPaidLeave', sql.Int, req.body.TotalPaidLeave)
          .input('TotalUnpaidLeave', sql.Int, req.body.TotalUnpaidLeave)
          .input('TeamLeader', sql.UniqueIdentifier, req.body.TeamLeader) // Ensure this is a valid GUID
          .input('TotalAvailableOptionalLeave', sql.Int, req.body.TotalAvailableOptionalLeave)
          .input('Address', sql.VarChar, req.body.Address)
          .input('Birthdate', sql.Date, req.body.Birthdate)
          .input('Designation', sql.VarChar, req.body.Designation)
          .input('EMPCode', sql.VarChar, req.body.EMPCode)
          .input('ResignationDate', sql.Date, req.body.ResignationDate) // Can be null
          .query(`
              UPDATE EmployeeInfo 
              SET 
                  Firstname = @Firstname,
                  Lastname = @Lastname,
                  Email = @Email,
                  MobileNo = @MobileNo,
                  IsActive = @IsActive,
                  IsDeleted = @IsDeleted,
                  EmployeeType = @EmployeeType,
                  Category_Id = @Category_Id,
                  Salary = @Salary,
                  Role = @Role,
                  TotalAvailablePaidLeave = @TotalAvailablePaidLeave,
                  TotalPaidLeave = @TotalPaidLeave,
                  TotalUnpaidLeave = @TotalUnpaidLeave,
                  TeamLeader = @TeamLeader,
                  TotalAvailableOptionalLeave = @TotalAvailableOptionalLeave,
                  Address = @Address,
                  Birthdate = @Birthdate,
                  Designation = @Designation,
                  EMPCode = @EMPCode,
                  ResignationDate = @ResignationDate
              WHERE Id = @Id
          `);

      return res.json({ Status: true, Message: "Employee Updated Successfully", Result: result });
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error: " + err.message });
  }
});

router.delete('/delete_employee/:Id', async (req, res) => {
  try {
      const Id = req.params.Id;
      const pool = await poolPromise;
      
      const result = await pool.request()
          .input('Id', sql.VarChar, Id) // Declare the @Id parameter properly
          .query("DELETE FROM EmployeeInfo WHERE Id = @Id");

      return res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
  }
});

router.get('/admin_count', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT COUNT(Id) AS admin FROM EmployeeInfo WHERE Role='789e4567-e89b-12d3-a456-426614174111'  ");
      res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      res.json({ Status: false, Error: "Query Error: " + err });
  }
});

router.get('/employee_count', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT COUNT(Id) AS employee FROM EmployeeInfo");
      res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      res.json({ Status: false, Error: "Query Error: " + err });
  }
});

router.get('/salary_count', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("select sum(salary) as salaryOFEmp from EmployeeInfo");
      res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      res.json({ Status: false, Error: "Query Error: " + err });
  }
});

router.get('/admin_records', async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT Firstname , Lastname ,Email  from EmployeeInfo where Role='789e4567-e89b-12d3-a456-426614174111'");
      res.json({ Status: true, Result: result.recordset });
  } catch (err) {
      res.json({ Status: false, Error: "Query Error: " + err });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as adminRouter };
