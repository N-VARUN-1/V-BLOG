import express from 'express';
import { deleteUser, getUser, getUsers, signOut, test } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyUser, updateUser);
router.delete('/delete/:userId', verifyUser, deleteUser );
router.post('/sign-out', signOut);
router.get('/getusers', verifyUser, getUsers);
router.get('/:userId', getUser);

export default router;
