<template>
  <modal-box v-model="showModal" large-title="Give Comic">
    <div>
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Search Comic
      </label>
      <div>
        <input
          v-model="searchComicName"
          type="text"
        >
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        @click="searchComic"
      >
        Search
      </button>
    </div>
    <div>
      <select v-model="selectedComic" @change="selectedComicChange">
        <option :value="null"></option>
        <option v-for="(comic) in searchedComics" :key="comic.id" :value="comic">{{ comic.title }} ({{ comic.id }})</option>
      </select>
    </div>
    <div v-if="!wrappedIsNil(selectedComic)">
      Select chapters to give:
      <select multiple v-model="selectedChapter" @change="selectChapterChange">
        <option value="all">All</option>
        <option v-for="(chapter) in selectedComic.chapters_data" :key="chapter.id" :value="chapter">Chapter no. {{ chapter.chapter_number }} ({{ chapter.id }})</option>
      </select>
    </div>
    <button
      v-if="selectedChapter.length > 0"
      class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
      @click="submit"
    >
      Submit
    </button>
  </modal-box>
</template>

<script>
import ModalBox from '@/components/ModalBox.vue'
import Comic from '@/firebase/comics/Comic.js'
// import { searchComicByName } from '@/firebase/utils/queries.js'
import { where } from 'firebase/firestore'
import isNil from 'lodash/isNil'
import User from '@/firebase/users/User'
export default {
  components: {
    ModalBox
  },
  props: {
    user: {
      type: User
    }
  },
  data(){
    return {
      showModal: false,
      searchComicName: null,
      searchedComics: [],
      selectedComic: null,
      searched: false,
      selectedChapter: [],
    }
  },
  methods: {
    wrappedIsNil(value){
      return isNil(value)
    },
    openModal(){
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
      this.searchComicName = null
      this.searchedComics = []
      this.selectedComic = null
      this.searched = false
      this.selectedChapter = []
      this.showModal = false
    },
    async searchComic(){
      this.searchedComics = await Comic.getDocuments([where('title', '==', this.searchComicName)])
      console.log(this.searchedComics)
      this.searched = true
    },
    submit(){
      this.user.bestowComic(this.selectedComic.id, this.selectedChapter.map((v) => {
        if(v == 'all'){
          return v
        }else{
          return v.id
        }
      }))
      this.closeModal()
    },
  }
}
</script>

<style>

</style>
