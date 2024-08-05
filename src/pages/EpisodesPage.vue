

<script setup lang="ts">
import HeaderComponent from '@/components/root/HeaderComponent.vue';
import { rickAPI } from '@/api/rickAndMorty/rickAPI';
import CardsComponent from '@/components/card/CardsComponent.vue';
const {
    episodes,  
    updatePage, 
    reset, 
    totalPages,
    currentPage
} = rickAPI()


</script>

<template>
    <div class="episodes">
      <HeaderComponent>
        The Rick and Morty Episodes
      </HeaderComponent>
      <div class="content">
        <div class="container">
          <CardsComponent
            :array="episodes"
            :total-pages="totalPages"
            :current-page="currentPage"
            :update-page="updatePage"
            :reset="reset"
            :type="'episode'"
          />
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>