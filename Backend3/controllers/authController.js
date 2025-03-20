import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { dbConfig } from "../config/dbConfig.js";

dotenv.config();

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool
            .request()
            .input("Email", sql.NVarChar, email)
            .query("SELECT * FROM EmployeeDeetailss WHERE Email = @Email");

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.Id, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.Role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
