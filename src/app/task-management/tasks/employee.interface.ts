/**
 * Title: employee.interface.ts
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/23/23
 */

import { Item } from './item.interface'

export interface Employee {
  empId: number
  todo: Item[]
  done: Item[]
}