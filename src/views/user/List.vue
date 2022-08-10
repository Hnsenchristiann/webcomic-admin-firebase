<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>User List</hero-bar>
  <main-section>
    <user-card
      class="mb-6"
      title="Users List"
      label="Add a new user"
      :icon="mdiTable"
      has-table
    >
      <user-table checkable />
    </user-card>
  </main-section>
</template>

<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import UserTable from '@/views/user/component/UserTable.vue'
import UserCard from '@/views/user/component/UserCard.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'User List'])
</script>
