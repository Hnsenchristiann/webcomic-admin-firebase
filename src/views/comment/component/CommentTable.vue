<template>
  <!-- <div
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
  </div> -->

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>id</th>
        <th>Name</th>
        <th>User Data</th>
        <th>Comment</th>
        <th>Created</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(comment, index) in comments"
        :key="comment.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, comment)"
        />
        <td data-label="Id">
          {{ comment.id }}
        </td>
        <td data-label="Commenter">
          {{ comment.user }}
        </td>
        <td data-label="Comment">
          {{ comment.user_data }}
        </td>
        <td data-label="Comment Id">
          {{ comment.message }}
        </td>
        <td data-label="Created">
          {{ comment.date }}
        </td>
        <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
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
      <small id="comment-page">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
// import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
// import JbButtons from '@/components/JbButtons.vue'
// import JbButton from '@/components/JbButton.vue'
import Comment from '@/firebase/comics/Comment.js'
// import { orderByDateDesc } from '@/firebase/utils/queries.js'
export default {
	data () {
		return {
			comments: {}
		}
	},
	mounted () {
		this.fetchComments()
	},
	methods: {
		async fetchComments () {
      try{
        const comments = await Comment.getDocumentsCollection()
        this.comments = comments
      }catch(err){
        console.error(err)
      }
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

const items = computed(() => mainStore.comment)

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

const checked = (isChecked, comment) => {
	if (isChecked) {
		checkedRows.value.push(comment)
	} else {
		checkedRows.value = remove(checkedRows.value, row => row.id === comment.id)
	}
}
</script>
