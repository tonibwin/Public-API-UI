import EntriesWrapper from "../dtos/entries-wrapper";

class PublicApiService {
    public static async getCategory(category: string){
        return await fetch(`https://api.publicapis.org/entries?category=${category}`).then(response => {
            return response.json() as Promise<EntriesWrapper>;
        }).catch((err) => {
            throw new Error(err);
        })
    }
}
export default PublicApiService;