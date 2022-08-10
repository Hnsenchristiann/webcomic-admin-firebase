<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Comic List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Comics"
      label="Add a new comic"
      :icon="mdiTable"
      has-table
    >
      <comic-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import ComicTable from '@/views/comic/component/ComicTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Comic List'])
</script>
