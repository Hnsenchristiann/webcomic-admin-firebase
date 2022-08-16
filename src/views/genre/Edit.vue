<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Edit Genre</hero-bar>
  <main-section>
    <tag-card
      class="mb-6"
      title="Genre"
      label="Add a new Genre"
      :icon="mdiTable"
      has-table
    >
      <form class="w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
          <input
            name="genreEdit"
            v-model="genre.name"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Genre's Name"
          >
        </div>
      </form>

      <router-link :to="{name: 'genre', params: { id: genre.id}}">
        <button
          id="genre-save"
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="updateGenres(genre.id)"
        >
          Save
        </button>
      </router-link>
    </tag-card>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TagCard from '@/views/tag/component/TagCard.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Genre from '@/firebase/Category.js'
import { doc, updateDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
export default {
	data () {
		return {
			genre: {}
		}
	},
	created () {
		this.fetchGenre()
	},
	methods: {
		async fetchGenre () {
			this.genre = await Genre.getDocumentWithStorageResource(this.$route.params.id)
		},
		async updateGenres (genreId) {
			const docRef = doc(firebase.db, 'categories', genreId)
			await updateDoc(docRef, {
				name: this.genre.name
			})
			console.log(docRef)
			this.$router.go()
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Genre', 'Edit'])
</script>
