import express from 'express';
import { getAllExcuses, getExcuseByCode, addExcuse } from '../controllers/excuseController.js';

const router = express.Router();

//  Récupérer toutes les excuses
router.get('/', getAllExcuses);

//  Récupérer une excuse par code HTTP
router.get('/:code', getExcuseByCode);

//  Ajouter une excuse
router.post('/', addExcuse);

export default router;