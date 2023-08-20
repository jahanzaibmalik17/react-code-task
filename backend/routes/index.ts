import { Router } from 'express';
import { getTerm, createTerm } from '../controllers/searchTerm';
import { check, validationResult } from 'express-validator';

const router = Router();

router.get('/search-term', getTerm);
router.post('/search-term', [
    check("name").not().isEmpty().isLength({ min: 5 }).withMessage('Name must have more than 5 characters')
], (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ "message": errors.array()[0].msg });
    }
    next();
}, createTerm);

export default router;