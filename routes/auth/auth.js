import { Router } from "express";
import "../../passport/Passport.js";
import {BasicStrategy} from "passport-http";
import passport from "passport";
const authRouter = Router();

authRouter.post('/', passport.authenticate('basic', {session: false, succesRedirect: "/", failureRedirect: "/faile"}), (req, res)=>{
    console.log('im here')
    res.json(req.user)
})

export {authRouter}