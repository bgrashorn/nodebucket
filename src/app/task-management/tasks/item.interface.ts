/**
 * Title: item.interface.ts
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/23/23
 */

export interface Category {
  categoryName: string
  backgroundColor: string
}

export interface Item {
  _id?: string //optional
  text: string
  category: Category
}