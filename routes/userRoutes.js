/* 
/users/signUp
/users/signIn
*/

import express from "express";
import {createUser, signIn, perfil } from "../Controllers/userController.js"
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();


router.post('/signup', createUser);

router.post('/signin', signIn);

router.get('/user', checkAuth, perfil );

export default router;