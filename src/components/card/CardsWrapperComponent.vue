<script setup lang="ts">
import { onMounted } from 'vue'
import CardsComponent from './CardsComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { rickAPI } from '@/api/rickAndMorty/rickAPI';
import type { NameAPI, ArrayAPI } from '@/api/rickAndMorty/interfaces';




const {apiName} = rickAPI()

const props = defineProps<{
  array: ArrayAPI,
  totalPages: number[],
  currentPage: number
  updatePage: (page: number) => Promise<void>,
  reset: () => void
  type:NameAPI
}>()






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
            <CardsComponent v-if="array.length > 0" :array="array" :type="type" :reset="reset" />
            <PaginationComponent class="pagination" v-if="array.length > 0" :pages-arr="totalPages" :current-page="currentPage" @update="updatePage"  />
          </div>
</template>

<style scoped>

  .pagination{
    margin-top: 30px;
  }

  
</style>