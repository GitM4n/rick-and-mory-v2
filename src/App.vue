<script setup lang="ts">
import LoaderComponent from './components/LoaderComponent.vue';
import { useLoader } from '@/composables/useLoader';
const {loading} = useLoader()
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <LoaderComponent v-show="loading"/>
</template>

<style>





</style>
