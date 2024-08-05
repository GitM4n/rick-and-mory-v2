<script setup lang="ts">
import HeaderComponent from '@/components/root/HeaderComponent.vue';
import { rickAPI } from '@/api/rickAndMorty/rickAPI';
import CardsComponent from '@/components/card/CardsComponent.vue';
const {
    locations,  
    updatePage, 
    reset, 
    totalPages,
    currentPage
} = rickAPI()

</script>

<template>
    <div class="locations">
        <HeaderComponent>
          The Rick and Morty Locations
        </HeaderComponent>
        <div class="content">
          <div class="container">
            <CardsComponent
              :array="locations"
              :total-pages="totalPages"
              :current-page="currentPage"
              :update-page="updatePage"
              :reset="reset"
              :type="'location'"
            />
          </div>
        </div>
      </div>
</template>

<style scoped>

</style>