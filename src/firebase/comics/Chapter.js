// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import Page from './Page.js'
import firebaseSettings from '../firebaseSettings.js'
import {
  doc,
  increment,
  // updateDoc,
  // setDoc,
  arrayUnion,
  writeBatch
} from 'firebase/firestore'
import { StorageLink } from '../types/index.js';

export default class extends Subcollection {
    static collection = 'chapters'
    static fields = {
      chapter_number: Number,
      release_date: Date,
      view_count: Number,
      price: Number,
      ar_price: Number,
      pages: Subcollection.resolve('./Page.js'),
      chapter_preview_url: StorageLink
    }

    async viewChapter (userId = null) {
      const counterIndex = Math.floor(Math.random() * firebaseSettings.counterShardNum).toString()
      const chapterCounterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id, 'counters', counterIndex)

      const batch = writeBatch(this.constructor.db)

      batch.update(chapterCounterRef, {
        view_count: increment(1)
      })
      if (userId) {
        const readHistoryRef = doc(this.constructor.db, 'users', userId, 'read_history', this.parentId)
        const chapterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id)
        batch.set(readHistoryRef, {
          chapters: arrayUnion(chapterRef)
        }, { merge: true })
      }

      return batch.commit()
      // return await updateDoc(chapterCounterRef, {
      //     view_count: increment(1)
      // }).then((res) => {
      //     if(userId){
      //         return setDoc(readHistoryRef, {
      //             chapters: arrayUnion(chapterRef)
      //         }, { merge: true })
      //     }else{
      //         return res
      //     }
      // })
    }

    async getPages (queries = []) {
      const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
      this.pages = await Page.getDocuments(path, queries)
      return this.pages
    }

    static async getChapters(path){
        const chapters = await this.getDocuments(path)
        return chapters
    }
}
