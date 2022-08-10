<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Page List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Pages"
      label="Add a new Chapter"
      :icon="mdiTable"
      has-table
    >
      <page-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import PageTable from '@/views/page/component/PageTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Comic', 'Chapter', 'Page List'])
</script>
