import { connect } from "http2"
import prisma from "../db"

export const getOneUpdate = async (req, res) => {
    const id = req.params.id
    
    const update = await prisma.update.findFirst({
        where : {
            id
        }
    })
    res.json({data : update})
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id,
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    res.json({data : updates})
}

export const createUpdate = async (req, res) => {
    const {productId, ...rest} = req.body
    const product = await prisma.product.findUnique({
        where : {
            id: req.body.productId
        }
    })

    if(!product){
        // does not belong to user
        res.json({message : "Nope"})
    }

    const newUpdate = await prisma.update.create({
        data : {
            title : rest.title,
            body : rest .body,
            product : {connect : {id : product.id}}
        }
    })

    res.json({data : newUpdate })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) return res.json({message : "Nope"})

    const updatedUpdate = prisma.update.update({
        where: {
            id : req.params.id
        },
        data : req.body
    })

    res.json({data : updatedUpdate})
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) return res.json({message : "Nope"})

    const deletedUpdate = await prisma.update.delete({
        where: {
            id : req.params.id
        }
    })
    res.json({data : deletedUpdate})
}