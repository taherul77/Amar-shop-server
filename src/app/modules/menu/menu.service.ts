import IMenu from './menu.interface';
import { Menu } from './menu.model'

const createMenuForDatabase = async (payload: IMenu) => {
  const result = await Menu.create(payload)
  return result
}

const getAllMenuFromDatabase = async (limit?: number) => {
  let menuQuery = Menu.find()

  if (limit) {
    menuQuery = menuQuery.limit(limit)
  }

  const menu = await menuQuery.exec()
  return menu
}

const getSingleMenuFromDatabase = async (id: string) => {
  const result = await Menu.findById(id)
  return result
}

const getAllMenuCategoryFromDatabase = async () => {
  const categories = await Menu.distinct('category')
  return categories
}

const getMenuByCategoryFromDatabase = async (
  category: string,
  limit?: number
) => {
  let menuQuery = Menu.find({ category })

  if (limit) {
    menuQuery = menuQuery.limit(limit)
  }

  const menu = await menuQuery.exec()
  return menu
}

const updateMenuFromDatabase = async (id: string, updatedData: Partial<IMenu>) => {
  const result = await Menu.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  })
  return result
}

const deleteMenuFromDatabase = async (id: string) => {
  const result = await Menu.findByIdAndDelete(id)
  return result
}

const total = async () => {
  const result = await Menu.countDocuments()
  return result
}

export default {
  createMenuForDatabase,
  getAllMenuFromDatabase,
  getSingleMenuFromDatabase,
  getAllMenuCategoryFromDatabase,
  getMenuByCategoryFromDatabase,
  updateMenuFromDatabase,
  deleteMenuFromDatabase,
  total,
}
