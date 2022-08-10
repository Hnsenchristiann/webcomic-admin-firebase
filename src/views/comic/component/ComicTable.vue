<template>
  <modal-box
    v-model="isModalDeletePromptActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>You are about to delete <b>{{ deleteTitle }}</b></p>
    <p>Are you sure???</p>
    <div>
      <button
        class="red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
        @click="deleteComic"
      >
        Delete
      </button>
      <button
        class="blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        @click="isModalDeletePromptActive = false"
      >
        Cancel
      </button>
    </div>
  </modal-box>

  <modal-box
    v-model="isSearchModalActive"
    title="Search Comic"
  >
    <div>Enter Search Term</div>
    <input
      v-model="searchTerm"
      type="text"
    >
    <button
      class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
      @click="goSearch"
    >
      Search
    </button>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>
  <div class="px-4 py-3">
    <button
      v-if="!searching"
      class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
      @click="openSearchModal"
    >
      Search
    </button>
    <div
      v-else
      class="flex flex-row"
    >
      Searching for {{ searchTerm }}...
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        @click="closeSearch"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>id</th>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Release</th>
        <th>Created</th>
        <th>Actions</th>
        <th />
      </tr>
    </thead>
    <tbody class="comic-table">
      <tr
        v-for="comic in comics"
        :key="comic.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, comic)"
        />
        <td data-label="Id">
          {{ comic.id }}
        </td>
        <td data-label="Title">
          {{ comic.title }}
        </td>
        <td data-label="Author">
          <div
            v-for="author in comic.authors_data"
            :key="author.id"
          >
            {{ author.name }}
          </div>
        </td>
        <td data-label="Genre">
          {{ comic.categories }}
        </td>
        <td data-label="Release Date">
          {{ comic.description }}
        </td>
        <td data-label="Release Date">
          {{ comic.release_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
        </td>
        <td class="actions-cell">
          <div
            class="flex justify-start lg:justify-end"
            no-wrap
          >
            <router-link :to="{name: 'comicEdit', params: { id: comic.id}}">
              <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                Edit
              </button>
            </router-link>

            <router-link :to="{name: 'chapter', params: { comicId: comic.id}}">
              <button class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
                Chapter
              </button>
            </router-link>

            <button
              class="mx-2 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
              @click="deleteComicPrompt(comic.id)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level>
      <div>
        <button
          v-if="currentPage != 1 && !disableNextButton"
          class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="prevComics"
        >
          Prev
        </button>
        <button
          v-if="currentPage != numPages && !disablePrevButton"
          class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="nextComics"
        >
          Next
        </button>
      </div>
      <small id="comic-page">Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Comic from '@/firebase/comics/Comic.js'
import Setting from '@/firebase/Setting.js'
import { comicQueryPaginated, comicQueryNextPage, comicQueryPrevPage, searchQueryArrayAll } from '@/firebase/utils/queries.js'
export default {
	data () {
		return {
			comics: [],
			numPages: 0,
			currentPage: 1,
			searchTerm: '',
			isSearchModalActive: false,
			isModalDeletePromptActive: false,
			disableNextButton: false,
			disablePrevButton: false,
			searching: false,
      toDeleteComic: null,
		}
	},
  watch: {
    isModalDeletePromptActive: function (newValue) {
      if (!newValue) {
        this.toDeleteComic = null
      }
    }
  },
	mounted () {
		this.fetchComics()
	},
	methods: {
		deleteComic () {
      this.isModalDeletePromptActive = false
      this.toDeleteComic.delete()
      this.toDeleteComic = null
    },
		deleteComicPrompt (id) {
      this.toDeleteComic = this.comics.find(comic => comic.id === id)
			this.isModalDeletePromptActive = true
		},
		goSearch () {
			this.findComics()
			this.isSearchModalActive = false
		},
		openSearchModal () {
			this.isSearchModalActive = true
		},
		async nextComics () {
			this.comics = await Comic.getDocuments(comicQueryNextPage('all', 'release_date', 'desc', this.comics[this.comics.length - 1].doc))
			this.currentPage++
    },
		async prevComics () {
			this.comics = await Comic.getDocuments(comicQueryPrevPage('all', 'release_date', 'desc', this.comics[0].doc))
			this.currentPage--
		},
		async fetchComics () {
			const comicsPromise = Comic.getDocuments(comicQueryPaginated('all', 'release_date', 'desc'))
			const counterPromise = Setting.getComicCounter()
			const [comics, comicCount] = await Promise.all([comicsPromise, counterPromise])
			this.comics = comics
			this.numPages = Math.ceil(comicCount / 10)
			console.log(this.currentPage)
		},
		async findComics () {
			const searchQuery = searchQueryArrayAll(this.searchTerm)
			this.comics = await Comic.getDocuments(searchQuery)
			this.searching = true
			this.disableNextButton = true
			this.disablePrevButton = true
		},
		closeSearch () {
			this.searching = false
			this.searchTerm = ''
			this.disableNextButton = false
			this.disablePrevButton = false
			this.fetchComics()
		}
	}
}
</script>

<script setup>
defineProps({
	checkable: Boolean
})

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const lightBgStyle = computed(() => mainStore.lightBgStyle)

const tableTrStyle = computed(() => mainStore.tableTrStyle)

const tableTrOddStyle = computed(() => mainStore.tableTrOddStyle)

// const darkMode = computed(() => mainStore.darkMode)

// const items = computed(() => mainStore.comic)

// const isModalActive = ref(false)

// const isModalDangerActive = ref(false)

// const perPage = ref(10)

const checkedRows = ref([])

const remove = (arr, cb) => {
	const newArr = []

	arr.forEach(item => {
		if (!cb(item)) {
			newArr.push(item)
		}
	})

	return newArr
}

const checked = (isChecked, comic) => {
	if (isChecked) {
		checkedRows.value.push(comic)
	} else {
		checkedRows.value = remove(checkedRows.value, row => row.id === comic.id)
	}
}
</script>
