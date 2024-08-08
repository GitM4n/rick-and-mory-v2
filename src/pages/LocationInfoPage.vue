<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { rickAPI } from '@/api/rick-and-morty/rickAPI';
import type { ILocation, ICharacter } from '@/api/rick-and-morty/interfaces';
import CardsComponent from '@/components/card/CardsComponent.vue';

const props = defineProps<{
    id: number
}>()

const {
    getSingleCard,
    getPromisesData
}=rickAPI()

const card = ref<ILocation>()
const residents = ref<ICharacter[]>([])


onMounted(async () => {
    const data = await getSingleCard(props.id, 'location')
    if(data) card.value = data as ILocation

    if(card.value && card.value.residents.length > 0){
        const data = await getPromisesData(card.value.residents, 'character')
        residents.value = data as ICharacter[]
    }
})


</script>

<template>
    <div class="location" v-if="card">
        <div class="location__header">
            <h1 class="location__name">
                {{ card.name }}
            </h1>
            <p class="location__type">
                Type: {{ card.type }}
            </p>
            <p class="location__dimension">
                Dimension: {{ card.dimension }}
            </p>
        </div>
        <div class="container">
            <div class="location__content">
                <div class="location__body">
                    <div class="location__characters">
                        <h2 class="location__characters-title">Residents: ({{ residents.length }})</h2>
                        <CardsComponent v-if="residents.length > 0" class="location__characters-list" :array="residents" :type="'character'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.location__header{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(241, 241, 241);
    color: rgb(32, 35, 41);
    height: 400px;
    justify-content: center;
 
}

.location__characters{
    display: flex;
    flex-direction: column;

}

.location__type,
.location__dimension{
    font-size: 3rem;
}

.location__name,
.location__characters-title{
    font-size: 8rem;
    text-wrap: balance;
    text-align: center;
    font-weight: 900;
  
}



</style>