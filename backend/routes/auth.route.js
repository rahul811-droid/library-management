
import express from 'express'
import { signup,signin,signout ,getAllUsers,getOneUser ,updateUser,deleteUser} from '../controllers/auth.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signout)
router.get('/getalluser',getAllUsers)
router.get('/getuser/:userId',verifyToken,getOneUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.put('/update/:userId',verifyToken,updateUser)

// router.post('/reset-password',forgetPassword)

export default router;