import express from 'express';
import { getJobs, getSavedJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);

router.get('/saved', getSavedJobs);

export default router;