


const express = require("express");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));
const config = {
  user: "sa",
  password: "Suthar@1928",
  server: "LAPTOP-MPCU0HKA",
  database: "EmployeeDBB",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

app.post("/api/employees", async (req, res) => {
  const {
    Firstname, Lastname, Email, Password, MobileNo, Profile,
    IsActive, IsDeleted, EmployeeType, Salary, CreatedAt, UpdatedAt,
    TotalAvailablePaidLeave, TotalPaidLeave, TotalUnpaidLeave,
    TotalAvailableOptionalLeave, Address, Birthdate, Designation, EMPCode,
  } = req.body;

  if (!Firstname || !Lastname || !Email || !Password || !MobileNo) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Firstname", sql.NVarChar(50), Firstname)
      .input("Lastname", sql.NVarChar(50), Lastname)
      .input("Email", sql.NVarChar(100), Email)
      .input("Password", sql.NVarChar(255), Password)
      .input("MobileNo", sql.BigInt, MobileNo)
      .input("Profile", sql.NVarChar(255), Profile)
      .input("IsActive", sql.Bit, IsActive)
      .input("IsDeleted", sql.Bit, IsDeleted)
      .input("EmployeeType", sql.NVarChar(20), EmployeeType)
      .input("Salary", sql.Float, Salary)
      .input("CreatedAt", sql.DateTime, CreatedAt)
      .input("UpdatedAt", sql.DateTime, UpdatedAt)
      .input("TotalAvailablePaidLeave", sql.Int, TotalAvailablePaidLeave)
      .input("TotalPaidLeave", sql.Int, TotalPaidLeave)
      .input("TotalUnpaidLeave", sql.Int, TotalUnpaidLeave)
      .input("TotalAvailableOptionalLeave", sql.Int, TotalAvailableOptionalLeave)
      .input("Address", sql.NVarChar(255), Address)
      .input("Birthdate", sql.Date, Birthdate)
      .input("Designation", sql.NVarChar(50), Designation)
      .input("EMPCode", sql.NVarChar(10), EMPCode)
      .query(`
        INSERT INTO EmployeeDetailss 
        (Firstname, Lastname, Email, Password, MobileNo, Profile, 
        IsActive, IsDeleted, EmployeeType, Salary, CreatedAt, UpdatedAt, 
        TotalAvailablePaidLeave, TotalPaidLeave, TotalUnpaidLeave, 
        TotalAvailableOptionalLeave, Address, Birthdate, Designation, EMPCode)
        OUTPUT INSERTED.Id
        VALUES 
        (@Firstname, @Lastname, @Email, @Password, @MobileNo, @Profile, 
         @IsActive, @IsDeleted, @EmployeeType, @Salary, @CreatedAt, @UpdatedAt, 
         @TotalAvailablePaidLeave, @TotalPaidLeave, @TotalUnpaidLeave, 
         @TotalAvailableOptionalLeave, @Address, @Birthdate, @Designation, @EMPCode)
      `);

    const insertedId = result.recordset[0].Id;

    res.status(201).json({
      message: "Employee created successfully",
      EmployeeId: insertedId,
    });

  } catch (err) {
    console.error("Database insertion error:", err);
    res.status(500).json({ message: "Error creating employee" });
  }
});


app.get("/api/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Id", sql.UniqueIdentifier, id)
      .query("SELECT * FROM EmployeeDetailss WHERE Id = @Id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ message: "Error fetching employee" });
  }
});


app.put("/api/employees/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const fields = Object.keys(updates).map(field => `${field} = @${field}`).join(", ");
  if (!fields) return res.status(400).json({ message: "No fields to update" });

  try {
    const pool = await sql.connect(config);
    const request = pool.request().input("Id", sql.UniqueIdentifier, id);

    for (const [key, value] of Object.entries(updates)) {
      request.input(key, value);
    }

    const result = await request.query(`
      UPDATE EmployeeDetailss SET ${fields}, UpdatedAt = GETDATE() WHERE Id = @Id
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Database update error:", err);
    res.status(500).json({ message: "Error updating employee" });
  }
});


app.delete("/api/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Id", sql.UniqueIdentifier, id)
      .query("DELETE FROM EmployeeDetailss WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Database deletion error:", err);
    res.status(500).json({ message: "Error deleting employee" });
  }
});


app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Email", sql.NVarChar(100), email)
      .input("Password", sql.NVarChar(255), password)
      .query("SELECT * FROM EmployeeDetailss WHERE Email = @Email AND Password = @Password");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
  // const user = result.recordset[0];
  // const token = jwt.sign({ id: user.Id }, 'your_jwt_secret', { expiresIn: '1h' });
  // res.status(200).json({ token, user });
});





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
