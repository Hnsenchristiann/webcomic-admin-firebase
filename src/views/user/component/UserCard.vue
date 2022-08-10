<template>
  <modal-box
    v-model="isModalActive"
    hascancel
    title="Create new User"
  >
    <div class="flex">
      <label id="user-role" class="w-72 px-4 flex items-center justify-start font-bold text-gray-700">Role</label>
      <input
        id="grid-first-name"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Enter User Role"
      >
    </div>

    <div class="flex">
      <label id="user-name" class="w-72 px-4 flex items-center justify-start font-bold text-gray-700">Name</label>
      <input
        id="grid-first-name"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Enter User Name"
      >
    </div>

    <div class="flex">
      <label id="user-email" class="w-72 px-4 flex items-center justify-start font-bold text-gray-700">Email</label>
      <input
        id="grid-first-name"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Enter User Email"
      >
    </div>

    <div class="flex">
      <label id="user-password" class="w-72 px-4 flex items-center justify-start font-bold text-gray-700">Password</label>
      <input
        id="grid-first-name"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Enter User Password"
      >
    </div>

    <div class="flex">
      <label id="user-confirm" class="w-72 px-4 flex items-center justify-start font-bold text-gray-700">Confirm Password</label>
      <input
        id="grid-first-name"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Confirm User Password"
      >
    </div>

    <div class="flex items-center justify-center pt-5">
      <button class="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cancel
      </button>
      <button class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Confirm
      </button>
    </div>
  </modal-box>

  <component
    :is="is"
    :class="componentClass"
    @submit="submit"
  >
    <header
      v-if="title"
      :class="lightBorderStyle"
      class="flex items-stretch border-b dark:border-gray-800"
    >
      <p
        class="flex items-center py-3 grow text-xl font-bold"
        :class="[ icon ? 'px-4' : 'px-6' ]"
      >
        <icon
          v-if="icon"
          :path="icon"
          :size="24"
          class="mr-3"
        />
        {{ title }}
      </p>
      <a
        v-if="computedHeaderIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center ring-blue-700 focus:ring"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="info"
              label="submit"
              small
              @click="isModalActive = true"
            />
          </jb-buttons>
        </td>
      </a>
    </header>
    <div
      v-if="empty"
      class="text-center py-24 text-gray-500 dark:text-gray-400"
    >
      <p>Nothing's here…</p>
    </div>
    <div
      v-else
      :class="{'p-6':!hasTable}"
    >
      <slot />
    </div>
  </component>
</template>

<script setup>
import { mdiCog } from '@mdi/js'
import { useMainStore } from '@/store/main'
import { computed, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import ModalBox from '@/components/ModalBox.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const props = defineProps({
	title: {
		type: String,
		default: null
	},
	icon: {
		type: String,
		default: null
	},
	headerIcon: {
		type: String,
		default: null
	},
	rounded: {
		type: String,
		default: 'md:rounded'
	},
	hasTable: Boolean,
	empty: Boolean,
	form: Boolean,
	hoverable: Boolean,
	modal: Boolean
})

const emit = defineEmits(['header-icon-click', 'submit'])

const is = computed(() => props.form ? 'form' : 'div')

const mainStore = useMainStore()

const isModalActive = ref(false)

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const componentClass = computed(() => {
	const base = [
		props.rounded,
		lightBorderStyle.value,
		props.modal ? 'dark:bg-gray-900' : 'dark:bg-gray-900/70'
	]

	if (props.hoverable) {
		base.push('hover:shadow-lg transition-shadow duration-500')
	}

	return base
})

const computedHeaderIcon = computed(() => props.headerIcon ?? mdiCog)

const headerIconClick = () => {
	emit('header-icon-click')
}

const submit = e => {
	emit('submit', e)
}
</script>
