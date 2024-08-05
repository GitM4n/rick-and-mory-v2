<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';
import LoaderComponent from '@/components/root/LoaderComponent.vue';
   
const {loading} = useLoader()
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <LoaderComponent v-show="loading"/>
</template>

<style>


body{
  color: white;
}

.container{
  max-width: 1460px;
  padding: 0 15px;
  margin: 0 auto;
 
 }

.content{
  color: white;
  padding: 40px 0;
 }
</style>
