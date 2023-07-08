import PublicApiService from "../services/public-api-service";
import Entry from "../dtos/entry";
import InformationCardInterface from "../interfaces/information-card-interface";

class PublicApiManager {
    public static async getCategory(category: string) {
        return await PublicApiService.getCategory(category)
            .then(async entriesWrapper => {
                return entriesWrapper?.entries;
            });
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