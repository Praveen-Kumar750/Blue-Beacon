import express from "express";

import {login, register, updateProfile} from  "../controllers/usercontroller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/profile/update",isAuthenticated,updateProfile)


export default router;