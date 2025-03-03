import express from 'express';
import { getAllLeaves, applyLeave,updateLeaveStatus } from '../controllers/leaveController.js';

const router = express.Router();

router.get('/all', getAllLeaves);
router.post('/apply', applyLeave);
router.put('/update-status',updateLeaveStatus);

export default router;
