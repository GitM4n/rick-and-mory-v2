<script setup lang="ts">
import { onMounted } from 'vue'
import IconFilter from '@/assets/icons/IconFilter.vue';
import ItemCard from '../components/HomePage/ItemCard.vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PaginationComponent from '../components/HomePage/PaginationComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { rickApi } from '../api/rickAndMorty/rickApi'


const {
    characters, 
    isModal, 
    totalPages, 
    updatePage, 
    setFilters, 
    reset, 
    currentPage
} = rickApi()


onMounted(async () => {
    await updatePage(currentPage.value)
})

</script>



<template>
    <div class="home">
    <HeaderComponent class="header">
        The Rick and Morty Characters
        <template #filter>
            <IconFilter class="header__filter" @click="isModal=true"/>
        </template>
    </HeaderComponent>
      <div class="content">
        <div class="container">
          <div class="cards-grid">
            <ul class="cards">
              <li class="no-result" v-if="characters.length === 0">No search results. <span class="reload-text" @click="reset()">Reload</span></li>
              <ItemCard
                v-for="character in characters"
                :key="character.id"
                :character="character"
              />
            </ul>
          </div>
            <PaginationComponent class="pagination" v-if="characters.length > 0" :pages-arr="totalPages" :current-page="currentPage" @update="updatePage"  />
         
      </div>
      <ModalComponent @click="isModal=false" :is-open="isModal" @submit="setFilters"/>
    </div>
    </div>
</template>



<style scoped>
  .container{
    max-width: 1460px;
    padding: 0 15px;
    margin: 0 auto;
   
   }
  .header__filter{
        width: 50px;

   }
  .content{
    color: white;
    padding: 40px 0;
   }
  
  
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