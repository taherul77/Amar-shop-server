import { Request, Response } from 'express'

import menuService from './menu.service'

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query
    const parsedLimit = limit ? parseInt(limit as string, 10) : undefined
    const menu = await menuService.getAllMenuFromDatabase(parsedLimit)
    res.status(200).json({
      success: true,
      message: 'Successfully load data',
      data: menu,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to load data',
    })
  }
}

export const getAllCategoriesAndImages = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await menuService.getMenuCategoryAndImageFromDatabase()
    res.status(200).json({
      success: true,
      message: 'Successfully load data',
      data: data,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to load data',
    })
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await menuService.getAllMenuCategoryFromDatabase()
    res.status(200).json({
      success: true,
      message: 'Successfully load data',
      data: categories,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to load data',
    })
  }
}

export const getMenuByCategories = async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const { limit } = req.query

    const parsedLimit = limit ? parseInt(limit as string, 10) : undefined
    const menu = await menuService.getMenuByCategoryFromDatabase(
      category,
      parsedLimit
    )
    res.status(200).json({
      success: true,
      message: 'Successfully load data',
      data: menu,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to load data',
    })
  }
}

export default {
  getMenu,
  getAllCategoriesAndImages,
  getAllCategories,
  getMenuByCategories,
}
