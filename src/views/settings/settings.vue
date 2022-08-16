<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Settings</hero-bar>
  <main-section>
    <div class="flex flex-wrap p-5">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              id="tab-banner"
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-600 bg-white': openTab !== 1, 'text-white bg-blue-600': openTab === 1}"
              @click="toggleTabs(1)"
            >
              Banners
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              id="tab-dashboard"
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-600 bg-white': openTab !== 2, 'text-white bg-blue-600': openTab === 2}"
              @click="toggleTabs(2)"
            >
              Dashboard Tags
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              id="tab-prices"
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-600 bg-white': openTab !== 3, 'text-white bg-blue-600': openTab === 3}"
              @click="toggleTabs(3)"
            >
              Prices
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              id="tab-social"
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-600 bg-white': openTab !== 4, 'text-white bg-blue-600': openTab === 4}"
              @click="toggleTabs(4)"
            >
              Social Media
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <button
                  id="banner-button" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="addNewBanner"
                >
                  Add Banners
                </button>
                <div
                  v-for="item in banners"
                  :key="item.index"
                  class="settings-banner py-4 bg-white shadow shadow-2xl rounded-xl max-w-md mt-3"
                >
                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <input
                      id="grid-first-name"
                      class="banner-title appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Title"
                    >
                    <input
                      id="grid-first-name"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Link banner to comic"
                    >
                  </div>
                  <div class="max-w-xl mt-3 px-4">
                    <label
                      class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
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
                  <button
                    id="banner-button-delete"
                    class="mx-4 my-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteBanner(index)"
                  >
                    Cancel
                  </button>
                </div>

                <button id="banner-button-save" class="my-3 mx-4  w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
              <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <button
                  id="tag-button"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="addNewTag"
                >
                  Add Tags
                </button>
                <div
                  v-for="item in tags"
                  :key="item.index"
                  class="settings-tag py-4 bg-white shadow shadow-2xl rounded-xl max-w-md mt-3"
                >
                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <label class="font-bold my-3 text-gray-700">Tags Name</label>
                    <div class="flex my-3">
                      <input
                        id="grid-first-name"
                        class="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        placeholder="Tag's Name"
                      >
                      <button
                        id="tag-button-delete"
                        class="mx-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="deleteTag(index)"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <button id="tag-button-save" class="my-3 mx-4  w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
              <div :class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <button
                  id="price-button"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="addNewPrice"
                >
                  Add Prices
                </button>
                <div
                  v-for="item in prices"
                  :key="item.index"
                  class="settings-prices py-4 bg-white shadow shadow-2xl rounded-xl max-w-md mt-3"
                >
                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <div class="flex">
                      <div>
                        <label class="font-bold my-3 text-gray-700">Tokens Price</label>
                        <div class="flex my-3">
                          <input
                            id="grid-first-name"
                            class="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Token's Price"
                          >
                          <a class="mx-2 flex items-center justify-center"> - </a>
                        </div>
                      </div>
                      <div>
                        <label class="font-bold my-3 text-gray-700">Tokens Amount</label>
                        <div class="flex my-3">
                          <input
                            id="grid-first-name"
                            class="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Token's Amount"
                          >
                          <button
                            id="price-button-delete"
                            class="mx-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            @click="deletePrice(index)"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button id="price-button-save" class="my-3 mx-4  w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
              <div :class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                <button
                  id="social-button"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="addNewSocialMedia"
                >
                  Add Social Media
                </button>
                <div
                  v-for="item in social_media"
                  :key="item.index"
                  class="settings-social py-4 bg-white shadow shadow-2xl rounded-xl max-w-md mt-3"
                >
                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <label class="font-bold text-gray-700">Social Media Name</label>
                    <div class="my-3">
                      <input
                        id="grid-first-name"
                        class="appearance-none block max-w-xl bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        placeholder="Social Media Name"
                      >
                      <input
                        id="grid-first-name"
                        class="appearance-none block max-w-xl bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        placeholder="Social Media Link"
                      >
                    </div>
                  </div>
                  <button
                    id="social-button-delete"
                    class="mx-4 my-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteSocialMedia(index)"
                  >
                    Delete
                  </button>
                </div>

                <button id="social-button-save" class="my-3 mx-4  w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
export default {
	name: 'FuchsiaTabs',
	data () {
		return {
			openTab: 1,
			banners: [{
				title: '',
				link: ''
			}],
			tags: [{
				name: ''
			}],
			prices: [{
				price: '',
				amount: ''
			}],
			social_media: [{
				name: '',
				link: ''
			}]
		}
	},
	methods: {
		toggleTabs: function (tabNumber) {
			this.openTab = tabNumber
		},
		addNewBanner () {
			this.banners.push({
				name: '',
				link: ''
			})
		},
		deleteBanner (index) {
			this.banners.splice(index, 1)
		},
		addNewTag () {
			this.tags.push({
				name: ''
			})
		},
		deleteTag (index) {
			this.tags.splice(index, 1)
		},
		addNewPrice () {
			this.prices.push({
				price: '',
				amount: ''
			})
		},
		deletePrice (index) {
			this.prices.splice(index, 1)
		},
		addNewSocialMedia () {
			this.social_media.push({
				name: '',
				link: ''
			})
		},
		deleteSocialMedia (index) {
			this.social_media.splice(index, 1)
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Settings'])
</script>
