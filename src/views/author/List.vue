<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Author List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Authors"
      label="Add a new author"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <author-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import AuthorTable from '@/views/author/component/AuthorTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Author List'])
</script>
