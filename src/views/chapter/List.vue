<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Chapter List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Chapters"
      label="Add a new Chapter"
      :icon="mdiTable"
      has-table
    >
      <chapter-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import ChapterTable from '@/views/chapter/component/ChapterTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Comic', 'Chapter List'])
</script>
