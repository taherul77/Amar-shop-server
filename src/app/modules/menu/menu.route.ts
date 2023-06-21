import express from 'express'
import menuController from './menu.controller'
import verifyAdmin from '../../middlewares/verifyAdmin'

const router = express.Router()

router.post('/create', verifyAdmin, menuController.createMenu)
router.get('/', menuController.getMenu)
router.get('/single/:id', menuController.getSingleMenu)
router.get('/categories', menuController.getAllCategories)
router.get('/:category', menuController.getMenuByCategories)
router.patch('/:id', verifyAdmin, menuController.updateMenu)
router.delete('/:id', verifyAdmin, menuController.deleteMenu)
router.get('/data/total', menuController.totalData)

export default router
