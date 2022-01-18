import express from 'express';
import ArtistController from '../Controllers/artist.controller.js';

const router = express.Router();

const controller = new ArtistController();

/* artist routes starter */
router.get('/api/artist', (req, res) => { controller.list(req, res) })
router.get('/api/artist/:id([0-9]*)', (req, res) => { controller.get(req, res) })
router.post('/api/artist', (req, res) => { controller.create(req, res) })
router.put('/api/artist', (req, res) => { controller.update(req, res) })
router.delete('/api/artist/:id([0-9]*)', (req, res) => { controller.delete(req, res) })

/* artist routes slutter */

export { router }