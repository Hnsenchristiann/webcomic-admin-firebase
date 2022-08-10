<template>
  <component
    :is="is"
    :class="componentClass"
    class="bg-white border dark:border-gray-800"
    @submit="submit"
  >
    <header
      id="comic-card-header"
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
              color="success"
              label="submit"
              small
              @click="isModalActive = true"
            />
            <jb-button
              color="warning"
              label="draft"
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
import { computed } from 'vue'
import Icon from '@/components/Icon.vue'
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
