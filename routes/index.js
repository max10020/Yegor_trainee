"use strict";
import { Router } from "express";
import {kennelRouter} from "./kennel/routes.kennel.js";
import {petRouter} from "./pet/routes.pet.js";
import {ownerRouter} from "./owner/routes.owner.js";
import {authRouter} from "./auth/auth.js";

const router = Router();

router.use('/kennel', kennelRouter);
router.use('/owner', ownerRouter);
router.use('/pet', petRouter);
router.use('/auth', authRouter)
export {router};