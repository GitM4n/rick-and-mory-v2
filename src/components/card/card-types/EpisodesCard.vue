<script setup lang="ts">
import type { IEpisode } from '@/api/rickAndMorty/interfaces';

const props = defineProps<{
    item: IEpisode
}>()


</script>

<template>
    <li class="card">
        <div class="card__inner episode">
          <div class="episode__content">
            <h3 class="episode__name">{{ props.item.name }}</h3>
            <div class="episode__air-date">
              <p>Air date:</p>
              <p>{{ props.item.air_date }}</p>
            </div>
            <div class="episode__episode">
              <p>Episode:</p>
              <p>{{ props.item.episode }}</p>
            </div>
          </div>
        </div>
    </li>
</template>

<style scoped>

.card__inner {
    display: flex;
    gap: 10px;
    background: rgb(60, 62, 68);
    border-radius: 16px;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  
  }


  .card__inner:hover{
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.5);
    background: white;
    color: rgb(60, 62, 68) ;

  }
  

  
  .episode__content{
    padding: 10px 15px;
  }
  
  .episode__name {
    font-size: 2.4rem;
    font-weight: 900;
  }
  


  .episode__air-date p:first-child,
  .episode__episode p:first-child {
    font-weight: 600;
    color: rgb(158, 158, 158);
  }
  
  
  @media (max-width:599px){
    .episode{
      flex-direction: column;
    }
  
  }

</style>