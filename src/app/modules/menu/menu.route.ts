import express from 'express'
import menuController from './menu.controller'

const router = express.Router()

router.get('/get-menus', menuController.getMenu)
router.get('/get-categories-and-images', menuController.getAllCategoriesAndImages)
router.get('/get-categories', menuController.getAllCategories)
router.get('/get-menu/:category', menuController.getMenuByCategories)

export default router
