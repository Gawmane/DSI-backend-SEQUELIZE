import express from "express";
import SongController from "../Controllers/song.controller.js";

const router = express.Router();
//Javascript class (new)
const controller = new SongController();

//Kalder routes med controller functions
router.get('/api/songs', (req, res) => { controller.list(req, res) });
router.get('/api/songs/:id([0-9]*)', (req, res) => { controller.get(req, res) });
router.post('/api/songs', (req, res) => { controller.create(req, res) });
router.put('/api/songs', (req, res) => { controller.update(req, res) });
router.delete('/api/songs/:id([0-9]*)', (req, res) => { controller.delete(req, res) });
//Søgefuntikon 
router.get('/api/songs/search', (req, res) => { controller.search(req, res) });





export { router }