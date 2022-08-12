<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Add a New Comic</hero-bar>
  <main-section>
    <comic-card
      class="mb-6"
      title="Comic"
      label="Add a new comic"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <form class="w-full max-w-full">
        <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
          <input
            name="comicTitle"
            v-model="comic.title"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Comic's Name"
          >
        </div>

        <div class="mt-5">
          <label
            id="comic-authors"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Authors
          </label>
          <div class="flex">
            <div
              v-for="author in comic.authors_data"
              :key="author.id"
              class="pr-3 flex relative"
            >
              <input
                name="comicAuthorsName"
                id="grid-first-name"
                v-model="author.name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter Author's Email"
                readonly
              >
              <XIcon
                class="absolute h-5 w-5 mb-3"
                style="right: 20px; top: calc(50% - 15px);"
                @click="deleteAuthor(author.id)"
              />
            </div>
            <div class="flex items-center">
              <PlusIcon
                class="h-5 w-5 mb-3"
                @click="isNewAuthorModalActive = true"
              />
            </div>
          </div>
        </div>

        <div class="flex -mx-3 mt-5 mb-6 max-w-full">
          <div class="w-full md:w-1/2 px-3">
            <label
              id="comic-genres"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Genres
            </label>
            <Listbox
              class="comic-genre"
              v-model="comic.categories"
              :items="categories"
              :settings="{valueField: 'name', nameField: 'name', idField: 'id'}"
            />
            <!-- <input
              id="grid-last-name"
              v-model="comic.categories"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Author's Id"
            > -->
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              id="comic-tags"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Tags
            </label>
            <Listbox
              class="comic-tag"
              v-model="comic.tags"
              :items="tags"
              :settings="{valueField: 'name', nameField: 'name', idField: 'id'}"
            />
            <!-- <input
              id="grid-last-name"
              v-model="comic.tags"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Author's Id"
            > -->
          </div>
        </div>

        <div class="mb-3 max-w-3xl">
          <label
            id="comic-description"
            for="exampleFormControlTextarea1"
            class="form-label font-bold inline-block mb-2 text-gray-700"
          >Description :</label>
          <textarea
            id="exampleFormControlTextarea1"
            v-model="comic.description"
            class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            rows="3"
            placeholder="Please Enter Author Description"
          />
        </div>

        <div class="max-w-xl mt-3">
          <p id="comic-cover" class="font-bold text-gray-700">
            Cover Image :
          </p>
          <label
            class="flex justify-center w-full h-32 px-4 mt-2 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
          >
            <img
              v-if="imageDataUrl"
              :src="imageDataUrl"
            >
            <img
              v-else-if="coverLoaded"
              :src="comic.cover_image_url"
            >
            <span
              v-else
              class="flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span id="comic-image-capt" class="font-medium text-gray-600">
                Drop files to Attach, or
                <span class="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input
              accept="image/*"
              type="file"
              name="file_upload"
              class="hidden"
              @change="onFileChange"
            >
          </label>
        </div>

        <div class="my-5">
          <div class="flex items-center justify-center">
            <button
              id="comic-submit"
              class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
              @click.prevent="submitData"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <!-- <form
        class="w-full max-w-full"
        @submit.prevent="addComics"
      >
        <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Comic's Name"
          >
        </div>

        <div class="mt-5">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Authors
          </label>
          <div class="flex">
            <div class="pr-3">
              <input
                id="grid-first-name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter Author's Name"
              >
            </div>
          </div>
        </div>

        <div class="flex -mx-3 mt-5 mb-6 max-w-full">
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Genres
            </label>
            <input
              id="grid-last-name"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Author's Id"
            >
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Tags
            </label>
            <input
              id="grid-last-name"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Author's Id"
            >
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Release Date
            </label>
            <input
              id="grid-last-name"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Author's Id"
            >
          </div>
        </div>

        <div class="mb-3 max-w-3xl">
          <label
            for="exampleFormControlTextarea1"
            class="form-label font-bold inline-block mb-2 text-gray-700"
          >Description :</label>
          <textarea
            id="exampleFormControlTextarea1"
            class="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
            rows="3"
            placeholder="Please Enter Author Description"
          />
        </div>

        <div class="max-w-xl mt-3">
          <p class="font-bold text-gray-700">
            Cover Image :
          </p>
          <label
            class="flex justify-center w-full h-32 px-4 mt-2 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
          >
            <span class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span class="font-medium text-gray-600">
                Drop files to Attach, or
                <span class="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input
              type="file"
              name="file_upload"
              class="hidden"
            >
          </label>
        </div>

        <div class="my-5">
          <div class="bg-white shadow shadow-2xl max-w-full p-5">
            <div class="flex items-center justify-center">
              <div class="flex-grow items-center justify-center text-lg">
                Chapter 0
              </div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
                Insert Chapter After
              </button>
            </div>
          </div>
        </div>

        <button class="mt-5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
          Save
        </button>
      </form> -->
    </comic-card>
  </main-section>
  <modal-box
    v-model="isNewAuthorModalActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="grid-first-name"
    >
      Search Author Name
    </label>
    <div>
      <input
        v-model="searchAuthorName"
        type="text"
      >
    </div>
    <div v-if="searchAuthorSearched">
      <div v-if="searchAuthorResult.length > 0">
        Select Author:
        <select v-model="selectedAuthor">
          <option
            v-for="(author) in searchAuthorResult"
            :key="author.id"
            :value="author.id"
          >
            {{ author.name }}
          </option>
        </select>
      </div>
      <div v-else>
        No author found
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        @click="searchAuthor"
      >
        Search
      </button>
      <button
        v-if="selectedAuthor"
        class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        @click="submitAuthor"
      >
        Submit
      </button>
    </div>
  </modal-box>
</template>

<script>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import ModalBox from '@/components/ModalBox.vue'
import Listbox from '@/components/Listbox.vue'
import Comic from '@/firebase/comics/Comic.js'
import ComicCard from '@/views/comic/component/ComicCard.vue'
import Author from '@/firebase/Author.js'
import Category from '@/firebase/Category.js'
import Tag from '@/firebase/Tag.js'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import { PlusIcon, XIcon } from '@heroicons/vue/solid'
import { where } from 'firebase/firestore'
import handleError from '@/utils/handleError.js'
// import utils from '@/firebase/utils/index.js'
// import { getStorage, ref } from "firebase/storage"
export default {
	components: {
		Listbox,
		PlusIcon,
		ModalBox,
		XIcon,
    ComicCard
		// ComboboxInput,
		// ComboboxOptions,
		// ComboboxOption
	},
	data () {
		return {
			// social_media: [{
			//   name: '',
			//   link: ''
			// }]
			comic: {
				tags: [],
				categories: [],
				authors: [],
				authors_data: []
			},
			categories: [],
			tags: [],
			isNewAuthorModalActive: false,
			searchAuthorName: '',
			searchAuthorResult: [],
			searchAuthorSearching: false,
			searchAuthorSearched: false,
			selectedAuthor: null,
			coverImage: null,
			coverImageChanged: false,
			imageDataUrl: null,
			coverLoaded: false
		}
	},
	computed: {
		releaseDate () {
			if (!isEmpty(this.comic.id)) {
				console.log(this.comic)
				return this.comic.release_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
			} else {
				return null
			}
		}
	},
	created () {
		// this.fetchComic()
		this.fetchTags()
		this.fetchCategories()
	},
	methods: {
		onFileChange (event) {
			this.coverImage = event.target.files[0]
			this.imageDataUrl = URL.createObjectURL(this.coverImage)
			this.coverImageChanged = true
		},
		// async fetchComic () {
		//   this.comic = new Comic()
		//   this.comic.setEmpty()
		// },
		async fetchTags () {
			this.tags = await Tag.getDocuments()
		},
		async fetchCategories () {
			this.categories = await Category.getDocuments()
		},
		async submitData () {
			try {
				// eslint-disable-next-line camelcase
				const { authors, authors_data, categories, tags, title, description } = this.comic
				const newComic = await Comic.createDocument({ authors, authors_data, categories, tags, title, description, release_date: new Date() })
				console.log(newComic)
				if (this.coverImageChanged) {
					try {
						await newComic.adminUploadField('cover_image_url', 'covers/' + newComic.id, this.coverImage)
					} catch (err) {
						await newComic.deleteDocument()
						console.error('error... deleting...')
						handleError(err, 'uploadFileError')
						throw err
					}
				}
				// this.$toast.open({
				// 	message: 'Success!',
				// 	type: 'success',
				// 	duration: 5000,
				// 	dismissible: true,
				// 	position: 'bottom'
				// })
			} catch (err) {
				// this.$toast.open({
				// 	message: err.toString(),
				// 	type: 'error',
				// 	duration: 5000,
				// 	dismissible: true,
				// 	position: 'bottom'
				// })
			}

			// this.comic.updateDocument(processedData)
		},
		deleteAuthor (authorRef) {
			remove(this.comic.authors, author => author.id === authorRef.id)
			remove(this.comic.authors_data, author => author.id.id === authorRef.id)
		},
		async searchAuthor () {
			this.searchAuthorSearching = true
			const byNamePromise = Author.getDocuments([where('name', '==', this.searchAuthorName)])
			const byEmailPromise = Author.getDocuments([where('email', '==', this.searchAuthorName)])
			const searchedAuthor = await Promise.all([byNamePromise, byEmailPromise]).then(([byName, byEmail]) => {
				return [...byName, ...byEmail]
			})
			this.searchAuthorSearching = false
			this.searchAuthorSearched = true
			this.searchAuthorResult = searchedAuthor
		},
		submitAuthor () {
			const author = this.searchAuthorResult.find(v => v.id === this.selectedAuthor)
			this.comic.authors.push(author.doc.ref)
			const data = {}
			data.id = author.doc.ref
			if (author.name) {
				data.name = author.name
			}
			if (author.profile_picture_url) {
				data.profile_picture_url = author.profile_picture_url
			}
			this.comic.authors_data.push(data)
			this.isNewAuthorModalActive = false
			this.searchAuthorSearched = false
			this.searchAuthorName = ''
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Comic', 'Add'])
</script>
