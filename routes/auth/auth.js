import { Router } from "express";
import "../../passport/Passport.js";
import {BasicStrategy} from "passport-http";
import passport from "passport";
const authRouter = Router();
import {userBasic} from "../../passport/Passport.js";

authRouter.post('/', userBasic,(req, res)=>{
    console.log('im here')
    const {user} = req;
    res.json(user)
})

export {authRouter}