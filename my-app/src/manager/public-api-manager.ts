import PublicApiService from "../services/public-api-service";
import Entry from "../dtos/entry";
import InformationCardInterface from "../interfaces/information-card-interface";
import CategoriesWrapper from "../dtos/categories-wrapper";
import EntriesWrapper from "../dtos/entries-wrapper";
import { setTimeout } from 'timers/promises';


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

    // public static async getAPIsByCategories(){
    //     await fetch(`https://api.publicapis.org/categories`).then(response => {
    //         return response.json() as Promise<CategoriesWrapper>;
    //     }).then(async categoriesWrapper => {
    //         const promises:any = [];
    //         categoriesWrapper.categories.map(category => {
    //             category = category.split(' ')[0];
    //             promises.push(fetch(`https://api.publicapis.org/entries?category=${category}`));
    //         });
    //
    //         await Promise.all(promises).then((entriesWrappers) => {
    //             entriesWrappers.forEach((entriesWrapper: Promise<EntriesWrapper>) => {
    //                 console.log(entriesWrapper);
    //             });
    //         });
    //     }).catch((err) => {
    //         throw new Error(err);
    //     })
    // }

    public static async getAPIsByCategories() {
        this.getCategories().then(async categories => {
            // TODO: finish sleep methods to prevent 429 errors.
            // https://www.useanvil.com/blog/engineering/throttling-and-consuming-apis-with-429-rate-limits/
            const delay = function(ms: number) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            const getMillisToSleep = function(retry: any) {
                let millisToSleep:any = Math.round(parseFloat(retry) * 1000)
                if (isNaN(millisToSleep)) {
                    millisToSleep = Math.max(0, Number(new Date(retry)) - Number(new Date()));
                }
                return millisToSleep
            }
            const getCategoryPromise = async function (promises: any[], category: string): Promise<any> {
                let response = await fetch(`https://api.publicapis.org/entries?category=${category}`);
                if (response.status == 429) {
                    const retryAfter = response.headers.get('retry-after')
                    const millisToSleep = getMillisToSleep(retryAfter)
                    await new Promise(f => setTimeout(f, 1000));
                    return getCategoryPromise(promises, category);
                } else {
                    promises.push(response);
                }
                return promises;
            }

            const promises:any = [];
            categories.map(category => {
                category = category.split(' ')[0];
                promises.push(getCategoryPromise(promises, category));
            });

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
                info:[{key:'Name', showKey:false, value: entry.API, variant: 'h5'}, {key:'Description', showKey:false, value: entry.Description, variant: 'subtitle1'}],
                link: entry.Link
            };
            infoCards.push(infoCard);
        });
        return infoCards;
    }
}
export default PublicApiManager;