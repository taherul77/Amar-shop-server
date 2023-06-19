import { Menu } from './menu.model'

const getAllMenuFromDatabase = async (limit?: number) => {
  let menuQuery = Menu.find()
  
  if (limit) {
    menuQuery = menuQuery.limit(limit)
  }

  const menu = await menuQuery.exec()
  return menu
}

const getMenuCategoryAndImageFromDatabase = async () => {
  const categories = await Menu.aggregate([
    {
      $group: {
        _id: '$category',
        image: { $first: '$image' },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        image: 1,
      },
    },
  ])
  return categories
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

export default {
  getAllMenuFromDatabase,
  getMenuCategoryAndImageFromDatabase,
  getAllMenuCategoryFromDatabase,
  getMenuByCategoryFromDatabase,
}
