<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Edit Tag</hero-bar>
  <main-section>
    <tag-card
      class="mb-6"
      title="Tags"
      label="Add a new comic"
      :icon="mdiTable"
      has-table
    >
      <form class="w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
          <input
            name="tagName"
            v-model="tag.name"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Tag's Name"
          >
        </div>
      </form>

      <router-link :to="{ name: 'tag', params: { id: tag.id }}">
        <button
          id="tag-save"
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="updateTags(tag.id)"
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
import Tag from '@/firebase/Tag.js'
import { doc, updateDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
export default {
	data () {
		return {
			tag: {
        name: '',
        id: null
      }
		}
	},
	created () {
		this.fetchTag()
	},
	methods: {
		async fetchTag () {
			this.tag = await Tag.getDocumentWithStorageResource(this.$route.params.id)
      console.log('this.tag', this.tag)
		},
		async updateTags (tagId) {
      console.log('tagId', tagId)
			const docRef = doc(firebase.db, 'tags', tagId)
			await updateDoc(docRef, {
				name: this.tag.name
			})
			console.log(docRef)
			this.$router.push('/tag')
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Tag', 'Edit'])
</script>
