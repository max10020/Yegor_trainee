// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import express from "express";
import passport from "passport";
import Owners from "../models/owner/Owner.js";
import { BasicStrategy } from "passport-http";


passport.use(new BasicStrategy({usernameField: "username", passwordField: "password"},
    function(username, password, done) {
        console.log('Hiii')
        const hashedPassword = btoa(password);
        Owners.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password !== atob(hashedPassword)) { return done(null, false); }
            return done(null, user);
        });
    }
));

export {passport};
