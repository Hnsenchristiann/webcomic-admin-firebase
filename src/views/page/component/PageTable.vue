<template>
  <div class="my-2">
    <router-link :to="{name: 'pageAdd'}">
      <button id="add-page" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
        Add New Page
      </button>
    </router-link>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Id</th>
        <th>Page Number</th>
        <th>AR</th>
        <th>Media Type</th>
        <th />
      </tr>
    </thead>
    <tbody
      v-for="item in pages"
      class="page-table"
      :key="item.id"
    >
      <tr :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']">
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, comic)"
        />
        <td data-label="Id">
          {{ item.id }}
        </td>
        <td data-label="Title">
          {{ item.page_number }}
        </td>
        <td data-label="Author">
          {{ item.is_ar }}
        </td>
        <td data-label="Genre">
          {{ item.media_type }}
        </td>
        <td class="actions-cell">
          <div
            class="justify-start lg:justify-end"
            no-wrap
          >
            <router-link :to="{name: 'pageEdit', params: { pageId: item.id}}">
              <button id="edit-page" class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                Edit
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
      <small id="page-total">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Page from '@/firebase/comics/Page.js'
export default {
	data () {
		return {
			pages: []
		}
	},
	mounted () {
		this.fetchPages()
	},
	methods: {
		async fetchPages () {
			const pages = await Page.getPages(['comics', this.$route.params.comicId, 'chapters', this.$route.params.chapterId, 'pages'])
			console.log(pages)
			this.pages = pages
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
