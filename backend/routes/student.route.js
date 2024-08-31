

import express from 'express'
import { addNew,getStudent,getAllstudent,deleteStudent,updateStudent } from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add',verifyToken,addNew);
router.get('/getall',verifyToken,getAllstudent);
router.get('/getone/:studentId',verifyToken,getStudent);
router.delete('/delete/:studentId',verifyToken,deleteStudent);
router.put('/update/:studentId',verifyToken,updateStudent);


export default router;