<script setup lang="ts">
import { computed, onMounted } from 'vue'
import {CharactersCard, EpisodesCard, LocationsCard} from './card-types'
import PaginationComponent from '@/components/PaginationComponent.vue';
import { rickAPI } from '@/api/rickAndMorty/rickAPI';
import type { ICharacter, IEpisode, NameAPI, ILocation } from '@/api/rickAndMorty/interfaces';

type ArrayAPI = ICharacter[] | IEpisode[] | ILocation[]

const {apiName} = rickAPI()

const props = defineProps<{
  array: ArrayAPI,
  totalPages: number[],
  currentPage: number
  updatePage: (page: number) => Promise<void>,
  reset: () => void
  type:NameAPI
}>()


function containsKey(obj:any, key:string){
    return key in obj 
}


const setCardComponent = () => {
  if(containsKey(props.array[0], 'status')){
    return CharactersCard
  }
  if(containsKey(props.array[0], 'air_date')){
    return EpisodesCard
  }
  if(containsKey(props.array[0], 'dimension')){
    return LocationsCard
  }
}



const setApiName = async () => {
  switch(props.type){
    case 'character':
      return apiName.value = 'character'
    case 'episode':
      return apiName.value = 'episode'
    case 'location':
      return apiName.value = 'location'
  }
}



onMounted(async () => {
    await setApiName()
    await props.updatePage(props.currentPage)
})

</script>

<template>
          <div class="cards-wrapper">
            <ul class="cards">
              <li class="no-result" v-if="array.length === 0">No search results. <span class="reload-text" @click="reset()">Reload</span></li>
              <component class="card" :is="setCardComponent()" v-for="item in array" :key="item.id" :item="item"/>
            </ul>
            <PaginationComponent class="pagination" v-if="array.length > 0" :pages-arr="totalPages" :current-page="currentPage" @update="updatePage"  />
          </div>
</template>

<style scoped>

  
  
  .cards{
    display: grid;
    justify-content: center;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(450px, 600px));
    grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
  
  }



  
  .no-result{
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }


  .pagination{
    margin-top: 30px;
  }

  .reload-text{
    color: orange;
    cursor: pointer;
    font-weight: 800;

  }

  .reload-text:hover{
    color: orangered;
  }
  
  @media (max-width:599px){
    .cards{
      grid-template-columns: 1fr;
    }
  }
  
  
</style>