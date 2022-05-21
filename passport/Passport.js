// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import express from "express";
import passport from "passport";
import Owners from "../models/owner/Owner.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// import { BasicStrategy } from "passport-http";

const {BasicStrategy} = require("passport-http")


const customFields = {
    usernameField: 'username',
    passwordField: 'password',
}

const verifyCallback =  async (username, password, done)=>{
    const hashedPassword = btoa(password);
    await Owners.findOne({ username: username }).then((user, err) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password !== atob(hashedPassword)) { return done(null, false); }
        return done(null, user);
    })

}

const strategy = new BasicStrategy(customFields, verifyCallback);

passport.use("basic", strategy);