"use strict";
import {Router} from "express";
import {getPet, addPet} from "../../controllers/pet/controller.pets.js";

const petRouter = Router();

petRouter.get('/:id', getPet)
petRouter.post('/', addPet)

export {petRouter};