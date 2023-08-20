import { RequestHandler } from 'express-serve-static-core';
import { SearchTerm } from '../models/searchTerm'


export const createTerm: RequestHandler = async (req, res, next) => {
    try {
        const searchTerm = await SearchTerm.findOne({ name: req.body.name })
        if (searchTerm) {
            res.json({ message: 'SearchTerm Already exists' });
        } else {
            const result = await SearchTerm.create({ name: req.body.name });
            res.status(201).json(result);
        }
    } catch (error) {
        throw error;
    }
}

export const getTerm: RequestHandler = async (req, res, next) => {
    try {
        const result = await SearchTerm.find({});
        res.json(result);
    } catch (error) {
        throw error;
    }
}
