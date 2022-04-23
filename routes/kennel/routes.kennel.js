"use strict";
import { Router } from "express";
const kennelRouter = Router();

import {getKennel, addKennel, adoptPet, viewPets} from "../../controllers/kennel/controller.kennel.js";

kennelRouter.get('/:id', getKennel)
kennelRouter.post("/", addKennel)
kennelRouter.put('/:kennel/:pet', adoptPet )
kennelRouter.get('/pets/:id', viewPets)

export {kennelRouter};