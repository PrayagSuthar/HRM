import express from "express";
import { checkInEmployee, checkOutEmployee, getAttendanceByEmployeeId } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/:Id", getAttendanceByEmployeeId);
router.post("/mark/checkin", checkInEmployee);
router.post("/mark/checkout", checkOutEmployee);

export default router;
