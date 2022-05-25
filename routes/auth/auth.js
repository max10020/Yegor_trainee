import { Router } from "express";
import "../../passport/Passport.js";
import {BasicStrategy} from "passport-http";
import passport from "passport";
const authRouter = Router();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jwt = require('jsonwebtoken');

authRouter.post('/'  , passport.authenticate("jwt", {session: false}), (req, res)=>{
    const username = {name: req.body.username}
    const accessToken = jwt.sign(username, "secret")
    res.send('Logged in successfully')
})

export {authRouter}

