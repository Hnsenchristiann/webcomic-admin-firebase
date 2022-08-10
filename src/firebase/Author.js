import { where } from "firebase/firestore";
import Collection from "./Collection.js";
import Comic from "./comics/Comic.js";
import { LongText, StorageLink } from "./types/index.js";

export default class extends Collection{
    static collection = 'authors'
    static fields = {
        'name': String,
        'profile_picture_url': StorageLink,
        'description': LongText,
        'social_media_links': Array,
        'email': String
    }

    async getComics(queries = []){
        queries.push(where('authors', 'array-contains', this.id))
        this.comics = Comic.getDocuments(['comics'], queries)
        return this.comics
    }

    static async getAuthors(){
        const authors = await this.getDocuments()
        return authors
    }
}