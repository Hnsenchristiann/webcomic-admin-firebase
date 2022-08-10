import Subcollection from "../Subcollection";
// import Comic from "../comics/Comic";

export default class extends Subcollection{
    static collection = 'purchased_comics'
    static fields = {
        'chapters': Array
    }

    static async getHistories(path){
        const purchased_comics = await this.getDocuments(path)
        return purchased_comics
    }
}
