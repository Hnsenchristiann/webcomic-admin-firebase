<template>
  <nav-bar />
  <aside-menu :menu="menu" />
  <router-view />
  <overlay
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/store/main'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import Overlay from '@/components/Overlay.vue'

const mainStore = useMainStore()

mainStore.setUser({
	name: 'Admin Webcomic',
	email: 'admin@admin.com',
	avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
})

const isAsideLgActive = computed(() => mainStore.isAsideLgActive)

const overlayClick = () => {
	mainStore.asideLgToggle(false)
}
</script>
