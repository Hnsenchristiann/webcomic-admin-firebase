<template>
  <modal-box
    v-model="isModalActive"
    title="Sample modal"
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
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

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>id</th>
        <th>Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in categories"
        :key="item.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, genre)"
        />
        <td data-label="Id">
          {{ item.id }}
        </td>
        <td data-label="Name">
          {{ item.name }}
        </td>
        <td class="actions-cell">
          <div class="flex justify-end">
            <div class="px-2">
              <router-link :to="{name: 'genreEdit', params: { id: item.id}}">
                <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </router-link>
            </div>
            <div class="px-2">
              <router-link :to="{name: 'genre', params: { id: item.id}}">
                <button
                  class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
                  @click="deleteGenres(item.id)"
                >
                  Delete
                </button>
              </router-link>
            </div>
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
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Category from '@/firebase/Category.js'
import { doc, deleteDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
export default {
	data () {
		return {
			categories: {}
		}
	},
	mounted () {
		this.fetchCategories()
	},
	methods: {
		async fetchCategories () {
			const categories = await Category.getCategories()
			this.categories = categories
		},
		async deleteGenres (genreId) {
			const docRef = doc(firebase.db, 'categories', genreId)
			await deleteDoc(docRef)
			console.log(docRef)
			this.$router.go()
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

const darkMode = computed(() => mainStore.darkMode)

const items = computed(() => mainStore.genre)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

// const itemsPaginated = computed(
//   () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
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

const checked = (isChecked, author) => {
	if (isChecked) {
		checkedRows.value.push(author)
	} else {
		checkedRows.value = remove(checkedRows.value, row => row.id === author.id)
	}
}
</script>
