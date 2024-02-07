import { myAxios } from "./helper"


export const loadAllCategories = () => {
    return myAxios.get(`/api/category/categoryList`).then(response => {return response.data})
}