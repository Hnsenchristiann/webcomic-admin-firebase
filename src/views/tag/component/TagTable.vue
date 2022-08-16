<template>
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
      <tr class="tag-table" v-for="(tag, index) in tags" :key="tag.id">
        <checkbox-cell v-if="checkable" @checked="checked($event, tag)" />
        <td class="tag-table-id">
          {{ tag.id }}
        </td>
        <td class="tag-table-name">
          {{ tag.name }}
        </td>
        <td class="actions-cell">
          <div class="flex justify-end">
            <div class="px-2">
              <router-link :to="{name: 'tagEdit', params: { id: tag.id}}">
                <button id="edit-tag-button" class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                    Edit
                  </button>
              </router-link>
            </div>
            <div class="px-2">
              <router-link :to="{name: 'tag', params: { id: tag.id}}">
                <button id="delete-tag-button" class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded" @click="deleteTags(tag.id)">
                    Delete
                  </button>
              </router-link>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div :class="lightBorderStyle" class="p-3 lg:px-6 border-t dark:border-gray-800">
    <level>
      <jb-buttons>
        <jb-button v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1" :outline="darkMode" small @click="currentPage = page" />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
  import {
    computed,
    ref
  } from 'vue'
  import {
    useMainStore
  } from '@/store/main'
  import ModalBox from '@/components/ModalBox.vue'
  import CheckboxCell from '@/components/CheckboxCell.vue'
  import Level from '@/components/Level.vue'
  import JbButtons from '@/components/JbButtons.vue'
  import JbButton from '@/components/JbButton.vue'
  import Tag from '@/firebase/Tag.js'
  import {
    doc,
    deleteDoc
  } from 'firebase/firestore'
  import firebase from '@/firebase/firebase'
  export default {
    data() {
      return {
        tags: {},
        selectedDoc: null
      }
    },
    mounted() {
      this.fetchTags()
    },
    methods: {
      async fetchTags() {
        const tags = await Tag.getTags()
        this.tags = tags
      },
      async deleteTags(tagId) {
        const docRef = doc(firebase.db, 'tags', tagId)
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
  const items = computed(() => mainStore.tag)
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
