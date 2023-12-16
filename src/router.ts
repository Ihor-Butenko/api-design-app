import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { handleErrors } from './modules/middleware';
import { getSingleProduct, getProducts, createProduct, deleteProduct, updatedProduct } from './handlers/products'
import { getUpdates, getOneUpdate, updateUpdate, createUpdate, deleteUpdate } from './handlers/update';

const router = Router();

// products

router.get('/product', getProducts, (req, res) => {})
router.get('/product/:id', handleErrors, getSingleProduct, (req, res) => {})
router.put('/product/:id', body('name').isString(), handleErrors, updatedProduct, (req, res) => {})
router.post('/product/', body('name').isString(), handleErrors, createProduct)
router.delete('/product/:id', deleteProduct) 

// update

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(), 
    body('productId').isString().optional(),
    handleErrors, updateUpdate)
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)

//update points

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', 
    body('name').optional().isString(),
    body('description').optional().isString(), 
    () => {})
router.post('/updatepoint',
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('updateId').exists().isString(), 
    () => {})
router.delete('/updatepoint/:id', () => {})

export default router;