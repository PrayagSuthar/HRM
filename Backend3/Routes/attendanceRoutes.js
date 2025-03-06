import express from 'express';
import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';

const router = express.Router();

// Mark Attendance (Check-in)
router.post('/checkin', async (req, res) => {
    try {
        const { userId:employeeId } = req.body;

        const pool = await sql.poolPromise;
        await pool.request()
            .input('EmployeeId', sql.UniqueIdentifier, employeeId)
            .input('CheckIn', sql.DateTime, new Date())
            .query('INSERT INTO EmployeeAttendance (EmployeeId, CheckIn) VALUES (@EmployeeId, @CheckIn)');
        
        res.json({ success: true, message: 'Check-in recorded' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Mark Attendance (Check-out)
router.post('/checkout', async (req, res) => {
    try {
        const { employeeId } = req.body;

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('EmployeeId', sql.UniqueIdentifier, employeeId)
            .query(`UPDATE EmployeeAttendance SET CheckOut = GETDATE(), 
                    WorkingHours = DATEDIFF(MINUTE, CheckIn, GETDATE()) / 60.0 
                    WHERE EmployeeId = @EmployeeId AND CheckOut IS NULL`);

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Check-out recorded' });
        } else {
            res.status(400).json({ success: false, message: 'No active check-in found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get Employee Attendance Records
router.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('EmployeeId', sql.UniqueIdentifier, id)
            .query('SELECT * FROM EmployeeAttendance WHERE EmployeeId = @EmployeeId ORDER BY CreatedAt DESC');

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get All Employees' Attendance (Admin)
router.get('/all', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query('SELECT e.Firstname, e.Lastname, a.* FROM EmployeeAttendance a JOIN EmployeeInfo e ON e.Id = a.EmployeeId ORDER BY a.CreatedAt DESC');

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
