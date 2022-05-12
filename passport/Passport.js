// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import express from "express";
import passport from "passport";
import Owners from "../models/owner/Owner.js";
import { BasicStrategy } from "passport-http";
import {handleErrors} from "../controllers/controller.js";


passport.use('basic', new BasicStrategy({usernameField: "username", passwordField: "password"},
    async function(username, password, done) {
        console.log('Hiii')
        const hashedPassword = btoa(password);
        await Owners.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password !== atob(hashedPassword)) { return done(null, false); }
            return done(null, user);
        });
    }
));

const _userBasic = passport.authenticate('basic', {session: false});

function userBasic (req, res, next) {
    _userBasic(req, res, async (e, token) => {
        if (e) {
            try {
                const err = { status: 401, serviceName: 'Authorization', message: e.message }
                return await handleErrors(err, res)
            } catch (e) {
                throw Error(e)
            }
        } else {
            next()
        }
    })
}

export {userBasic};
