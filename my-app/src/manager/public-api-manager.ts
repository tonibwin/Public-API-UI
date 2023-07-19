import PublicApiService from "../services/public-api-service";
import Entry from "../dtos/entry";
import InformationCardInterface from "../interfaces/information-card-interface";
import EntriesWrapper from "../dtos/entries-wrapper";


class PublicApiManager {
    public static async getCategory(category: string) {
        return await PublicApiService.getCategory(category)
            .then(async entriesWrapper => {
                return entriesWrapper?.entries;
            });
    }

    public static async getCategories() {
        return await PublicApiService.getCategories()
            .then(async categoriesWrapper => {
                return categoriesWrapper?.categories;
             });
    }

    public static async getEntries() {
        return await PublicApiService.getEntries()
            .then(async entriesWrapper => {
                return entriesWrapper?.entries;
            });
    }


    public static async getAPIsByCategories() {
        //nested call to get all entries in every category, handles 429 errors
        this.getCategories().then(async categories => {
            let pack = 0;
            let limit = 5;
            const promises:any = [];
            for(let category of categories) {
                category = category.split(' ')[0];
                promises.push(await fetch(`https://api.publicapis.org/entries?category=${category}`));

                pack++;
                if(pack == limit) {
                    await new Promise((resolve: any) => setTimeout(resolve, 1000));
                    pack = 0;
                }
            }

            await Promise.all(promises).then((entriesWrappers) => {
                entriesWrappers.forEach((entriesWrapper: Promise<EntriesWrapper>) => {
                    console.log(entriesWrapper);
                });
            });
        })
    }

    public static transformEntries(entries: Entry[]) {
        let infoCards: InformationCardInterface[] = [];
        entries.forEach(entry => {
            let infoCard: InformationCardInterface = {
                info:[
                    {key:'Name', showKey:false, showValue:true, value: entry.API, variant: 'h5'},
                    {key:'Description', showKey:false, showValue:true, value: entry.Description, variant: 'subtitle1'},
                    {key:'Category', showKey:false, showValue:false, value: entry.Category, variant: 'subtitle1'}
                ],
                link: entry.Link
            };
            infoCards.push(infoCard);
        });
        return infoCards;
    }
}
export default PublicApiManager;