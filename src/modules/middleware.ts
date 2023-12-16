import { validationResult } from 'express-validator';

export const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)

    if(!errors.isEmpty()){
        res.status(400)
        res.json({message : errors.array()})
    }else {
        next()
    }
}