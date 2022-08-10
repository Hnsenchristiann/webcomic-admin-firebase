<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Genre List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Genres List"
      label="Add a new genre"
      :icon="mdiTable"
      has-table
    >
      <genre-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import GenreTable from '@/views/genre/component/GenreTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Genre List'])
</script>
