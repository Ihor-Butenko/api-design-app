import prisma from '../db'

// Get all products
export const getProducts = async (req, res) => {
    const fullUser = await prisma.user.findUnique({
        where : {
            id : req.user.id,
            name : req.user.username
        },
        include: {
            products: true
        }
    })
    res.json({data : fullUser.products})
}

// Get a single product
export const getSingleProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId : req.user.id
        }
    })
    res.json({data : product})
}

// Create a new product

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data : {
                name : req.body.name,
                belongsToId : req.user.id
            }
        })
        
        res.json({data : product})
    }catch (e) {
        e.type = 'input'
        next(e)
    }
}

// Update product

export const updatedProduct = async (req, res) => {
    const id = req.params.id
    
    const updatedProduct = await prisma.product.update({
        where : {
            id,
            belongsToId: req.user.id
        },
        data : {
            name : req.body.name
        }
    })
    res.json({data : updatedProduct})
}

// Delete product

export const deleteProduct = async (req, res) => {
    const deleteProduct = await prisma.product.delete({
        where : {
            id_belongsToId : {
                id: req.params.id, 
                belongsToId: req.user.id
            }
        }
    })
    res.json({data : deleteProduct})
}