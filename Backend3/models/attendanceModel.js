import { poolPromise, sql } from "../utils/db.js";


export const markCheckIn = async (EmployeeID) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("EmployeeID", sql.UniqueIdentifier, EmployeeID)
      .query(
        `INSERT INTO EmployeeAttendance (EmployeeID, CheckInTime) 
         VALUES (@EmployeeID, GETDATE())`
      );
    return { success: true, message: "Check-in recorded" };
  } catch (error) {
    console.error("Check-in Error:", error);
    return { success: false, message: "Failed to check-in" };
  }
};

export const markCheckOut = async (EmployeeID) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("EmployeeID", sql.UniqueIdentifier, EmployeeID)
      .query(
        `UPDATE EmployeeAttendance 
         SET CheckOutTime = GETDATE() 
         WHERE EmployeeID = @EmployeeID 
         AND Date = CAST(GETDATE() AS DATE)
         AND CheckOutTime IS NULL`
      );
    return { success: true, message: "Check-out recorded" };
  } catch (error) {
    console.error("Check-out Error:", error);
    return { success: false, message: "Failed to check-out" };
  }
};

export const getAttendance = async (Id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("EmployeeID", sql.UniqueIdentifier, Id)
      .query(`
        SELECT 
          Date,
          CheckInTime,
          CheckOutTime,
          DATEDIFF(MINUTE, CheckInTime, CheckOutTime) / 60.0 AS TotalHours
        FROM EmployeeAttendance
        WHERE EmployeeID = @EmployeeID
        ORDER BY Date DESC
      `);

    return result.recordset;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
};

export const getAllEmployeeAttendance = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.query(`
      SELECT 
        e.Id AS EmployeeID,
        e.Name AS EmployeeName,
        a.Date,
        a.CheckInTime,
        a.CheckOutTime,
        DATEDIFF(MINUTE, a.CheckInTime, a.CheckOutTime) / 60.0 AS TotalHours
      FROM EmployeeAttendance a
      JOIN EmployeeInfo e ON a.EmployeeID = e.Id
      ORDER BY a.Date DESC
    `);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching all attendance records:", error);
    return [];
  }
};
