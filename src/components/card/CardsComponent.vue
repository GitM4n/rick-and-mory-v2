<script setup lang="ts">
import CharactersCard from './card-types/CharactersCard.vue';
import EpisodesCard from './card-types/EpisodesCard.vue';
import LocationsCard from './card-types/LocationsCard.vue';
import type { ArrayAPI, NameAPI } from '@/api/rick-and-morty/interfaces';
import { useRouter } from 'vue-router';


const props = defineProps<{
    array: ArrayAPI,
    reset?: () => void,
    type:NameAPI
}>()

const router = useRouter()


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
const routeToCard = (id:number) => {
  router.push({name: props.type, params: {id: id}})
}

</script>


<template>
    <ul class="cards">
        <li class="no-result" v-if="array.length === 0">No search results. <span v-if="props.reset" class="reload-text" @click="props.reset()">Reload</span></li>
            <component class="card" :is="setCardComponent()" v-for="item in array" :key="item.id" :item="item" @click="routeToCard(item.id)"/>
      </ul>
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
  .reload-text{
    color: orange;
    cursor: pointer;
    font-weight: 800;

  }

  .reload-text:hover{
    color: orangered;
  }


  @media (max-width:1099px) {
    .cards{
      grid-gap: 15px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
    }
  }
  
  @media (max-width:350px){
    .cards{
      grid-template-columns: 1fr;
    }
  }
  

</style>