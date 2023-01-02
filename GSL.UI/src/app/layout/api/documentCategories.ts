export interface DocumentSubCategory{
    id: string,
    name: string
   }

export interface DocumentCategory{
    id: string,
    name: string,
    documentSubCategoryId: string,
}