import Collection from "./Collection";
// import { collection, addDoc } from "firebase/firestore";
// import firebase from './firebase.js'

export default class extends Collection{
    static collection = 'tags'
    static fields = {
        'name': String
    }

    static async getTags(){
        const tags = await this.getDocuments()
        return tags
    }

    // static async addData () {
    //     const tag = await this.addData()
    //     return tag
    // }
}
