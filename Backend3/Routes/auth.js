import express from "express";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConfig from "../config/dbConfig.js"; // Ensure DB config is correct

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM Users WHERE Email = @email");

        const user = result.recordset[0];

        if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Email or Password" });

        // Generate JWT Token with user role
        const token = jwt.sign({ id: user.Id, role: user.Role }, "your_secret_key", { expiresIn: "1h" });

        res.json({ token, role: user.Role });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

export default router;
