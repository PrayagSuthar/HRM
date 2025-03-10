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

export const getAttendance = async (EmployeeID) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("EmployeeID", sql.UniqueIdentifier, EmployeeID)
      .query(
        `SELECT Date, CheckInTime, CheckOutTime, 
         DATEDIFF(HOUR, CheckInTime, CheckOutTime) AS TotalHours 
         FROM EmployeeAttendance 
         WHERE EmployeeID = @EmployeeID 
         ORDER BY Date DESC`
      );
    return result.recordset;
  } catch (error) {
    console.error("Fetch Attendance Error:", error);
    return [];
  }
};
