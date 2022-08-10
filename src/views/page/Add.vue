<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Add a New Page</hero-bar>
  <main-section>
    <author-card
      class="mb-6"
      title="Page"
      label="Add a new author"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <form
        class="w-full max-w-full"
      >
        <div class="flex flex-wrap -mx-3 mt-3 mb-6 max-w-3xl">
          <div id="page-add-media" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Media Type
            </label>
            <input
              name="mediaType"
              id="grid-first-name"
              v-model="page.media_type"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Media Type"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mt-2 mb-6 max-w-3xl">
          <div id="page-add-type" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Type
            </label>
            <input
              name="pageType"
              id="grid-first-name"
              v-model="page.is_ar"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Page Type"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mt-2 mb-6 max-w-3xl">
          <div id="page-add-pageNum" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Page Number
            </label>
            <input
              name="pageNumber"
              id="grid-first-name"
              v-model="page.page_number"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Page Number"
            >
          </div>
        </div>

        <div>
          <div class="max-w-xl mt-3">
            <p id="page-image" class="font-bold text-gray-700">
              Page Image :
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
                :src="page.page_image_url"
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
                <span id="page-image-capt" class="font-medium text-gray-600">
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

          <button
            id="page-button"
            class="mt-5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            @click.prevent="submitData"
          >
            Save
          </button>
        </div>
      </form>
    </author-card>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import AuthorCard from '@/views/author/component/AuthorCard.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import isEmpty from 'lodash/isEmpty'
import Page from '@/firebase/comics/Page.js'
import handleError from '@/utils/handleError.js'
// import { getStorage, ref } from "firebase/storage"
export default {
	data () {
		return {
			page: {
				is_ar: [],
				media_type: [],
				page_number: []
			},
			coverImage: null,
			coverImageChanged: false,
			imageDataUrl: null
		}
	},
	computed: {
		releaseDate () {
			if (!isEmpty(this.page.id)) {
				console.log(this.page)
				return this.page.release_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
			} else {
				return null
			}
		}
	},
	methods: {
		onFileChange (event) {
			this.coverImage = event.target.files[0]
			this.imageDataUrl = URL.createObjectURL(this.coverImage)
			this.coverImageChanged = true
		},
		async submitData () {
			try {
				// eslint-disable-next-line camelcase
				const { is_ar, media_type, page_number } = this.page
				const newPage = await Page.createDocument(
          this.$route.params.chapterId,
          ['comics', this.$route.params.comicId, 'chapters', this.$route.params.chapterId],
          {
            is_ar: String(is_ar),
            media_type: String(media_type),
            page_number: parseInt(page_number)
          }
        )
				console.log(newPage)
				if (this.coverImageChanged) {
					try {
            console.log('asdfasdf')
						await newPage.adminUploadField('page_image_url', 'comics/' + this.$route.params.comicId + '/chapters/' + this.$route.params.chapterId + '/pages/' + newPage.id, this.coverImage)
					} catch (err) {
						await newPage.deleteDocument()
						console.error('error... deleting...')
						handleError(err, 'uploadFileError')
						throw err
					}
				}
				this.$toast.open({
					message: 'Success!',
					type: 'success',
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				})
			} catch (err) {
				this.$toast.open({
					message: err.toString(),
					type: 'error',
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				})
			}
			this.$router.back()
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Page', 'Add'])
</script>
