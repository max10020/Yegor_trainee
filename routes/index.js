"use strict";
import { Router } from "express";
import {kennelRouter} from "./kennel/router.kennel.js";
import {petRouter} from "./pet/router.pet.js";
import {ownerRouter} from "./owner/router.owner.js";

const router = Router();

router.use('/kennel', kennelRouter);
router.use('/owner', ownerRouter);
router.use('/pet', petRouter);

export {router};