import { productType } from './documents/product'
import { subcategoryType } from './documents/subcategory'
import { catalogType } from './documents/catalog'
import { homePageType } from './documents/homePage'

export const schemaTypes = [productType, subcategoryType, catalogType, homePageType]

// Singleton documents: one fixed document each, no create/duplicate/delete
export const SINGLETONS = new Set(['homePage'])
