import EntriesWrapper from "../dtos/entries-wrapper";
import CategoriesWrapper from "../dtos/categories-wrapper";
import categoriesWrapper from "../dtos/categories-wrapper";

class PublicApiService {
    public static async getCategory(category: string){
        return await fetch(`https://api.publicapis.org/entries?category=${category}`).then(response => {
            return response.json() as Promise<EntriesWrapper>;
        }).catch((err) => {
            throw new Error(err);
        })
    }

    public static async getCategories(){
        return await fetch(`https://api.publicapis.org/categories`).then(response => {
            return response.json() as Promise<CategoriesWrapper>;
        }).catch((err) => {
            throw new Error(err);
        })
    }
}
export default PublicApiService;