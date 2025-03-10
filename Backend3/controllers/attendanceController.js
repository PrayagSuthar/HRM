import { markCheckIn, markCheckOut, getAttendance,getAllEmployeeAttendance } from "../models/attendanceModel.js";


export const checkInEmployee = async (req, res) => {
  const { Id } = req.body;
  if (!Id) return res.status(400).json({ success: false, message: "Employee ID is required" });

  const result = await markCheckIn(Id);
  res.json(result);
};


export const checkOutEmployee = async (req, res) => {
  const { Id } = req.body;
  if (!Id) return res.status(400).json({ success: false, message: "Employee ID is required" });

  const result = await markCheckOut(Id);
  res.json(result);
};


export const getAttendanceByEmployeeId = async (req, res) => {
  const { Id } = req.params;
  if (!Id) return res.status(400).json({ success: false, message: "Employee ID is required" });

  const records = await getAttendance(Id);
  res.json(records);
};

export const getAllAttendance = async (req, res) => {
  const records = await getAllEmployeeAttendance();
  res.json(records);
};