import { Request, Response } from 'express'
import menuService from './menu.service'

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { ...menu } = req.body
    const result = await menuService.createMenuForDatabase(menu)
    res.status(200).json({
      success: true,
      message: 'Successfully create data',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to load data',
    })
  }
}

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

export const getSingleMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await menuService.getSingleMenuFromDatabase(id as string)
    res.status(200).json({
      success: true,
      message: 'Successfully load data',
      data: result,
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

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const result = await menuService.updateMenuFromDatabase(id, updatedData)
    res.status(200).json({
      success: true,
      message: 'Successfully updated data',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update data',
    })
  }
}

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await menuService.deleteMenuFromDatabase(id)
    res.status(200).json({
      success: true,
      message: 'Successfully delete data',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete data',
    })
  }
}

export const totalData = async (req: Request, res: Response) => {
  const result = await menuService.total()
  res.send({total: result})
}

export default {
  createMenu,
  getMenu,
  getSingleMenu,
  getAllCategories,
  getMenuByCategories,
  updateMenu,
  deleteMenu,
  totalData,
}
