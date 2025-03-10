import express from "express";
import { checkInEmployee, checkOutEmployee, getAttendanceByEmployeeId,getAllAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/:Id", getAttendanceByEmployeeId);
router.post("/mark/checkin", checkInEmployee);
router.post("/mark/checkout", checkOutEmployee);
router.get("/all", getAllAttendance);

export default router;
