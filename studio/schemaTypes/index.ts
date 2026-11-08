import { productType } from './documents/product'
import { homePageType } from './documents/homePage'

export const schemaTypes = [productType, homePageType]

// Singleton documents: one fixed document each, no create/duplicate/delete
export const SINGLETONS = new Set(['homePage'])
