<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Comment List</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      title="Comments"
      label="Manage Comment"
      :icon="mdiTable"
      has-table
    >
      <comment-table checkable />
    </card-component>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CommentTable from '@/views/comment/component/CommentTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Comment List'])
</script>
