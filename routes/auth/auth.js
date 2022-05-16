import { Router } from "express";
import "../../passport/Passport.js";
import {BasicStrategy} from "passport-http";
import passport from "passport";
const authRouter = Router();
import {auth} from "../../controllers/owner/controller.owner.js";
import {handleErrors} from "../../controllers/controller.js";

authRouter.post('/', passport.authenticate('basic', { session: false }), (req, res)=>{
    console.log(req)
})

export {authRouter}

