<template>
  <router-link :to="{name: 'authorAdd'}">
      <button id="add-author" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
        Add New Author
      </button>
    </router-link>

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
        <th>Social Media</th>
        <th>Email</th>
        <th>Description</th>
        <th />
      </tr>
    </thead>
    <tbody class="author-table">
      <tr
        v-for="(author, index) in authors"
        :key="author.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, author)"
        />
        <td id="author-table-id" data-label="Id">
          {{ author.id }}
        </td>
        <td data-label="Name">
          {{ author.name }}
        </td>
        <td data-label="Token">
          {{ author.social_media_links.facebook }}, {{ author.social_media_links.twitter }}
        </td>
        <td data-label="Email">
          {{ author.email }}
        </td>
        <td data-label="Description">
          {{ author.description }}
        </td>
        <td class="actions-cell">
          <div
            class="flex justify-end"
            no-wrap
          >
            <div class="px-2">
              <router-link :to="{name: 'authorEdit', params: { id: author.id}}">
                <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </router-link>
            </div>

            <div class="px-2">
              <router-link :to="{name: 'author', params: { id: author.id}}">
                <button
                  class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
                  @click="deleteAuthors(author.id)"
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
      <small id="chapter-page">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Author from '@/firebase/Author'
import { doc, deleteDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
export default {
	data () {
		return {
			authors: {}
		}
	},
	mounted () {
		this.fetchAuthors()
	},
	methods: {
		async fetchAuthors () {
			const authors = await Author.getAuthors()
			this.authors = authors
		},
		async deleteAuthors (authorId) {
			const docRef = doc(firebase.db, 'authors', authorId)
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

const items = computed(() => mainStore.author)

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
