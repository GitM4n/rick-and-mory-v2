<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { rickAPI } from '@/api/rick-and-morty/rickAPI';
import type { IEpisode, ICharacter } from '@/api/rick-and-morty/interfaces';
import CardsComponent from '@/components/card/CardsComponent.vue';


const props = defineProps<{
    id: number
}>()

const {
    getSingleCard,
    getPromisesData
}=rickAPI()

const card = ref<IEpisode>()
const characters = ref<ICharacter[]>([])


onMounted(async () => {
    const data = await getSingleCard(props.id, 'episode')
    if(data) card.value = data as IEpisode

    if(card.value && card.value.characters.length > 0){
        const data = await getPromisesData(card.value.characters, 'character')
        characters.value = data as ICharacter[]
    }
})


</script>

<template>
    <div class="episode" v-if="card">
        <div class="episode__header">
            <h1 class="episode__name">
                {{ card.name }}
            </h1>
            <p class="episode__air-date">
                Air date: {{ card.air_date }}
            </p>
            <p class="episode__code">
                Episode: {{ card.episode }}
            </p>
        </div>
        <div class="container">
            <div class="episode__content">
                <div class="episode__body">
                    <div class="episode__characters">
                        <h2 class="episode__characters-title">Characters: ({{ characters.length }})</h2>
                        <CardsComponent v-if="characters.length > 0" class="episode__characters-list" :array="characters" :type="'character'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.episode__header{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(241, 241, 241);
    color: rgb(32, 35, 41);
    height: 400px;
    justify-content: center;
 
}

.episode__characters{
    display: flex;
    flex-direction: column;

}

.episode__air-date,
.episode__code{
    font-size: 3rem;
}

.episode__name,
.episode__characters-title{
    padding: 15px;
    font-size: 8rem;
    text-wrap: balance;
    text-align: center;
    font-weight: 900;
  
}

@media(max-width:1099px){
    .episode__name,
    .episode__characters-title{
        font-size: 6rem;
        line-height: 1.3;
    }

}



</style>