import {poolPromise,sql} from '../utils/db.js'

export const applyLeave = async (req, res) => {
  try {
      const { EMPCode, Firstname, Lastname, StartDate, Email,EndDate, Reason } = req.body;
      const pool = await poolPromise;
      await pool.request()
          .input('EMPCode', sql.NVarChar(10), EMPCode)
          .input('Firstname', sql.NVarChar(100), Firstname)
          .input('Lastname', sql.NVarChar(100), Lastname)
          .input('StartDate', sql.Date, StartDate)
          .input('Email',sql.NVarChar(255), Email)
          .input('EndDate', sql.Date, EndDate)
          .input('Reason', sql.NVarChar(255), Reason)
          .query('INSERT INTO LeaveRequest (EMPCode, Firstname, Lastname, StartDate,Email, EndDate, Reason) VALUES (@EMPCode, @Firstname, @Lastname, @StartDate,@Email, @EndDate, @Reason)');
      
      res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
      console.error('Error applying for leave:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM LeaveRequest');
      res.status(200).json(result.recordset);
  } catch (error) {
      console.error('Error fetching leaves:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
      const { EMPCode, status } = req.body;
      if (!['Accepted', 'Declined'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
      }

      const pool = await poolPromise;
      const result = await pool.request()
          .input('EMPCode', sql.NVarChar, EMPCode)
          .input('Status', sql.NVarChar, status)
          .query('UPDATE LeaveRequest SET Status = @Status WHERE EMPCode = @EMPCode');

      if (result.rowsAffected[0] === 0) {
          return res.status(404).json({ message: 'Leave request not found' });
      }

      res.json({ message: `Leave request ${status} successfully` });
  } catch (error) {
      res.status(500).json({ message: 'Error updating leave status', error: error.message });
  }
};

