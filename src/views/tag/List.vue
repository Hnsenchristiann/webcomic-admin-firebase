<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tag List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Tags List"
      label="Add a new tag"
      :icon="mdiTable"
      has-table
    >
      <tag-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TagTable from '@/views/tag/component/TagTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Tag List'])
</script>
