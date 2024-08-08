<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { rickAPI } from '@/api/rick-and-morty/rickAPI';
import type { IEpisode, ILocation, ICharacter } from '@/api/rick-and-morty/interfaces';
import CardsComponent from '@/components/card/CardsComponent.vue';
import LocationsCard from '@/components/card/card-types/LocationsCard.vue';

const props = defineProps<{
    id: number
}>()

const {
    getSingleCard,
    getPromisesData
}=rickAPI()

const card = ref<ICharacter>()
const location= ref<ILocation>()
const origin = ref<ILocation>()


const episodes = ref<IEpisode[]>([])


onMounted(async () => {
    console.log(props.id)
    const data = await getSingleCard(props.id, 'character')
    if(data) card.value = data as ICharacter


    if(card.value && card.value.episode.length > 0){
        const data = await getPromisesData(card.value.episode, 'episode')
        episodes.value = data as IEpisode[]
        const [locationData, originData ] = await getPromisesData([card.value.location.url, card.value.origin.url], 'location') as ILocation[]
        location.value = locationData 
        origin.value = originData
    }
})


</script>

<template>
    <div class="character" v-if="card">
        <div class="character__header">
            <div class="character__image">
                <img :src="card.image" :alt="card.name">
            </div>
            <h1 class="character__name">
                {{ card.name }}
            </h1>
            <p class="character__gender">
                Gender: {{ card.gender }}
            </p>
        </div>
        <div class="container">
            <div class="character__content">
                <div class="character__body">
                    <div class="character__status">
                        <p>Status: {{ card.status }}</p>
                        <span class="indicator" :style="{backgroundColor: card.status  === 'Alive' ? 'green' : card.status === 'unknown' ? 'gray' : 'red'}"></span>
                    </div>
                    <div class="character__origin">
                        <h2 class="character__origin-title">Origin</h2>
                        <LocationsCard v-if="origin" :item="origin" class="character__origin_card"/>
                    </div>
                    <div class="character__location">
                        <h2 class="character__location-title">Location</h2>
                        <LocationsCard v-if="location" :item="location" class="character__location_card"/>
                    </div>
                    <div class="character__episodes">
                        <h2 class="character__episodes-title">Episodes: ({{ episodes.length }})</h2>
                        <CardsComponent v-if="episodes.length > 0" class="character_episodes-list" :array="episodes" :type="'episode'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.character__header{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(241, 241, 241);
    color: rgb(32, 35, 41);
    height: 400px;
    justify-content: center;
 
}

.character__image{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
}

.character__image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.character__episodes{
    display: flex;
    flex-direction: column;

}

.character__body{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.character__status{
    display: flex;
    gap: 10px;
    align-items: center;
}

.indicator{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;

}

.character__status p,
.character__gender{
    font-size: 3rem;
    line-height: 1.5;
}


.character__location,
.character__origin{
    display: flex;
    flex-direction: column;
    align-items: center;
  
}

.character__episodes{
    width: 100%;
}

.character__name,
.character__episodes-title,
.character__origin-title,
.character__location-title{
    font-size: 8rem;
    text-wrap: balance;
    text-align: center;
    font-weight: 900;
  
}



.character__location_card,
.character__origin_card{
    width: 450px;
}


@media (max-width:599px){ 
    .character__location_card,
    .character__origin_card{
        width: 250px;
    }
}
    




</style>