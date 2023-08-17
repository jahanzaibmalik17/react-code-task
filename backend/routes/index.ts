import { Router } from 'express';
import { getTerm, createTerm } from '../controllers/searchTerm';
const router = Router();

router.get('/search-term', getTerm);
router.post('/search-term', createTerm);

export default router;