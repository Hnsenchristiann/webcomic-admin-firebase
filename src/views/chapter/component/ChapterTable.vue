<template>
  <div class="my-2">
    <router-link :to="{name: 'chapterAdd', params: { comicId: $route.params.comicId }}">
      <button id="add-chapter" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
        Add New Chapter
      </button>
    </router-link>
  </div>
  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Id</th>
        <th>Chapter Number</th>
        <th>Price</th>
        <th>View Count</th>
        <th>Release Date</th>
        <th>Actions</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in chapters"
        class="chapter-table"
        :key="item.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, comic)"
        />
        <td class="chapter-table-id" data-label="Id">
          {{ item.id }}
        </td>
        <td class="chapter-table-chapNum" data-label="Title">
          {{ item.chapter_number }}
        </td>
        <td class="chapter-table-price" data-label="Author">
          {{ item.price }}
        </td>
        <td class="chapter-table-view" data-label="Genre">
          {{ item.view_count }}
        </td>
        <td class="chapter-table-date" data-label="Release Date">
          {{ item.release_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
        </td>
        <td class="actions-cell flex">
          <div
            class="justify-start lg:justify-end"
            no-wrap
          >
            <router-link :to="{name: 'chapterEdit', params: { chapterId: item.id, comicId: $route.params.comicId}}">
              <button id="edit-chapter" class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                Edit
              </button>
            </router-link>

            <router-link :to="{name: 'pageList', params: { chapterId: item.id, comicId: $route.params.comicId}}">
              <button id="pages-chapter" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
                pages
              </button>
            </router-link>
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
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small id="chapter-page">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Chapter from '@/firebase/comics/Chapter.js'
export default {
	data () {
		return {
			chapters: []
		}
	},
	mounted () {
		this.fetchChapters()
	},
  computed: {
  },
	methods: {
		async fetchChapters () {
			this.chapters = await Chapter.getChapters(['comics', this.$route.params.comicId, 'chapters'])
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
const tableTrStyle = computed(() => mainStore.tableTrStyle)
const tableTrOddStyle = computed(() => mainStore.tableTrOddStyle)
const darkMode = computed(() => mainStore.darkMode)
const items = computed(() => mainStore.comic)
const perPage = ref(10)
const currentPage = ref(0)
const checkedRows = ref([])
// const itemsPaginated = computed(
//   () => comics.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )
const numPages = computed(() => Math.ceil(items.value.length / perPage.value))
const currentPageHuman = computed(() => currentPage.value + 1)
const pagesList = computed(() => {
	const pagesList = []
	for (let i = 0; i < numPages.value; i++) {
		pagesList.push(i)
	}
	return pagesList
})
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