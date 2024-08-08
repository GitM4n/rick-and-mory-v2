<script setup lang="ts">
import type { ILocation } from '@/api/rick-and-morty/interfaces';

const props = defineProps<{
    item: ILocation
}>()


</script>

<template>
    <li class="card">
        <div class="card__inner location">
          <div class="location__content">
            <h3 class="location__name">{{ props.item.name }}</h3>
            <div class="location__type">
              <p>Type:</p>
              <p>{{ props.item.type }}</p>
            </div>
            <div class="location__dimension">
              <p>Dimension:</p>
              <p>{{ props.item.dimension }}</p>
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
  
  .location__content{
    padding: 10px 15px;
  }
  
  .location__name {
    font-size: 2.4rem;
    font-weight: 900;
  }

  .location__type p:first-child,
  .location__dimension p:first-child {
    font-weight: 600;
    color: rgb(158, 158, 158);
  }

  
  @media (max-width:599px){
    .location{
      flex-direction: column;
    }

  }

</style>