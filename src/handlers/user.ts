import prisma from '../db';
import { createToken, hashPassword, comparePassword } from '../modules/auth';

export const createNewuser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.username,
                password: await hashPassword(req.body.password),
            }
        })
    
        const token = createToken(user)
        res.json({ token })
    }catch(e){
        e.type = 'input'
        next(e)
    }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where : {
            name : req.body.username,
        }
    })

    const isValid = await comparePassword(req.body.password, user.password)

    if(!isValid){
        req.status(401)
        res.json({message : 'Invalid username or password'})
    }

    const token = createToken(user)
    res.json({token})
}