import express from 'express';

import {poolPromise,sql} from '../utils/db.js'

const router = express.Router();


router.post('/mark', async (req, res) => {
  const { EMPCode, status } = req.body; 
  
  try {
    let pool = await sql.poolPromise;
    let query = `
      INSERT INTO EmployeeAttendance (EMPCode, Status, Timestamp)
      VALUES (@EMPCode, @Status, GETDATE());
    `;

    await pool.request()
      .input('EMPCode', sql.VarChar, EMPCode)
      .input('Status', sql.VarChar, status)
      .query(query);

    res.json({ success: true, message: 'Attendance marked successfully' });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:EMPCode', async (req, res) => {
  const { EMPCode } = req.params;
  
  try {
    let pool = await sql.poolPromise;
    let result = await pool.request()
      .input('EMPCode', sql.VarChar, EMPCode)
      .query(`
        SELECT * FROM EmployeeAttendance WHERE EMPCode = @EMPCode ORDER BY Timestamp DESC
      `);
    
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
