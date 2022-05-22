import passport from "passport";
import Owners from "../models/owner/Owner.js";
import {Strategy, ExtractJwt} from "passport-jwt"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jwt = require('jsonwebtoken');

const {BasicStrategy} = require("passport-http")

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
};

passport.use(new Strategy(opts, function(jwt_payload, done) {
    console.log('hi')
    Owners.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));