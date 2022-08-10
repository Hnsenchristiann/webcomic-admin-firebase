<template>
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
    <thead class="user-table">
      <tr>
        <th v-if="checkable" />
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th class="flex justify-center">
          Actions
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in users"
        :key="user.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, user)"
        />
        <td data-label="Id">
          {{ user.id }}
        </td>
        <td data-label="Name">
          {{ user.name }}
        </td>
        <td data-label="Email">
          {{ user.email }}
        </td>
        <td class="actions-cell">
          <div
            class="flex justify-end"
            no-wrap
          >
            <div class="px-2">
              <router-link :to="{name: 'userDetail', params: { id: user.id}}">
                <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                  Detail
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
      <div>
        <button
          v-if="currentPage != 1 && !disableNextButton"
          class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="prevUsers"
        >
          Prev
        </button>
        <button
          v-if="currentPage != numPages && !disablePrevButton"
          class="mx-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          @click="nextUsers"
        >
          Next
        </button>
      </div>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import User from '@/firebase/users/User'
import Setting from '@/firebase/Setting.js'
// import isEqual from 'lodash/isEqual'
import unionWith from 'lodash/unionWith'
import { userQueryPaginated, userQueryNextPage, userQueryPrevPage, searchUserQuery } from '@/firebase/utils/queries.js'
export default {
	data () {
		return {
			users: {},
			numPages: 0,
			currentPage: 1,
			searchTerm: '',
			isSearchModalActive: false,
			isModalDeletePromptActive: false,
			disableNextButton: false,
			disablePrevButton: false,
			searching: false,
		}
	},
	mounted () {
		this.fetchUsers()
	},
	methods: {
		deleteUser () {
      this.isModalDeletePromptActive = false
      this.toDeleteUser.delete()
      this.toDeleteUser = null
    },
		deleteUserPrompt (id) {
      this.toDeleteUser = this.users.find(user => user.id === id)
			this.isModalDeletePromptActive = true
		},
		goSearch () {
			this.findUsers()
			this.isSearchModalActive = false
		},
		openSearchModal () {
			this.isSearchModalActive = true
		},
		async nextUsers () {
			this.users = await User.getDocuments(userQueryNextPage('email', 'desc', this.users[this.users.length - 1].doc))
			this.currentPage++
		},
		async prevUsers () {
			this.users = await User.getDocuments(userQueryPrevPage('email', 'desc', this.users[0].doc))
			this.currentPage--
		},
		async fetchUsers () {
			const usersPromise = User.getDocuments(userQueryPaginated('email', 'desc'))
			const counterPromise = Setting.getUserCounter()
			const [users, userCount] = await Promise.all([usersPromise, counterPromise])
			this.users = users
			this.numPages = Math.ceil(userCount / 10)
			console.log(this.currentPage)
		},
		async findUsers () {
			const searchQueryEmail = searchUserQuery(this.searchTerm, 'email')
			const searchQueryName = searchUserQuery(this.searchTerm, 'name')
      const emailUsers = User.getDocuments(searchQueryEmail)
      const nameUsers = User.getDocuments(searchQueryName)
			this.users = await Promise.all([emailUsers, nameUsers]).then(([nameds, emailds]) => {
        return unionWith(nameds, emailds, (a, b) => a.id == b.id)
      })
			this.searching = true
			this.disableNextButton = true
			this.disablePrevButton = true
		},
		closeSearch () {
			this.searching = false
			this.searchTerm = ''
			this.disableNextButton = false
			this.disablePrevButton = false
			this.fetchUsers()
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
