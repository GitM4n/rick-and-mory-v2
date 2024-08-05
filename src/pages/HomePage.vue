<script setup lang="ts">

import ModalComponent from '@/components/root/ModalComponent.vue';
import HeaderComponent from '@/components/root/HeaderComponent.vue';
import IconFilter from '@/assets/icons/IconFilter.vue';
import CardsComponent from '@/components/card/CardsComponent.vue';

import { rickAPI } from '@/api/rickAndMorty/rickAPI';
import { ref } from 'vue';


const isModal = ref(false)


const {
    characters,  
    setFiltersCharacters,
    updatePage, 
    reset, 
    totalPages,
    currentPage
} = rickAPI()



const updateFilters = (name:string, status:string) => {
  setFiltersCharacters(name, status)
    isModal.value = false
}


const resetFilters = () => {
    reset()
    isModal.value = false
}


</script>

<template>
    <HeaderComponent class="header">
      The Rick and Morty Characters
      <template #filter>
          <IconFilter class="header__filter" @click="isModal=true"/>
      </template>
    </HeaderComponent >
    <div class="content">
      <div class="container">
        <CardsComponent
            :array="characters"
            :total-pages="totalPages"
            :current-page="currentPage"
            :update-page="updatePage"
            :reset="resetFilters"
            :type="'character'"
          />
      </div>
    </div>

    <ModalComponent @click="isModal=false" :is-open="isModal" @submit="updateFilters"/>

</template>

<style>
.header__filter{
  width: 50px;

}
</style>


