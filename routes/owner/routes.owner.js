"use strict";
import {Router} from "express";
import {getOwner, viewPets, addOwner, adoptPet} from "../../controllers/owner/controller.owner.js";

const ownerRouter = Router();

ownerRouter.get('/:id', getOwner);
ownerRouter.post('/', addOwner);
ownerRouter.put('/:owner/:pet', adoptPet);
ownerRouter.get('/pets/:id', viewPets);

export {ownerRouter};
