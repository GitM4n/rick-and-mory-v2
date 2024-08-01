<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ICharacter } from '@/api/rickAndMorty/interfaces';

const props = defineProps<{
  character: ICharacter,
}>()

const episodeName = ref<string>('')

const getEpisodeName = async () => {
  const result = await (await fetch(props.character.episode[0])).json()
  episodeName.value = result.name || 'Unknown'
}

onMounted(async () => {
  await getEpisodeName()
})
</script>

<template>
  <li class="card">
    <div class="card__inner character">
      <div class="character__image">
        <img :src="props.character.image" alt="avatar" />
      </div>
      <div class="character__content">
        <h3 class="character__name">{{ props.character.name }}</h3>
        <div class="character__status-species">
          <div
            class="indicator"
            :style="{
              backgroundColor:  props.character.status  === 'Alive' ? 'green' : props.character.status === 'unknown' ? 'gray' : 'red'
            }"
          ></div>
          <p class="status">{{ props.character.status }}</p>
          -
          <p class="species">{{ props.character.species }}</p>
        </div>
        <div class="character__location">
          <p>Last known location:</p>
          <p>{{ props.character.location.name }}</p>
        </div>
        <div class="character__episode">
          <p>First seen in</p>
          <p>{{ episodeName }}</p>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>


.character {
  display: flex;
  gap: 10px;
  background: rgb(60, 62, 68);
  border-radius: 16px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
  overflow: hidden;

}



.character__image img{
  height: 100%;
  margin: 0px;
  object-position: center center;
  object-fit: cover;
}

.character__content{
  padding: 10px 15px;
}

.character__name {
  font-size: 2.4rem;
  font-weight: 900;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.character__status-species {
  display: flex;
  align-items: center;
  gap: 5px;
}

.character__status-species p {
  font-size: 1.8rem;
  font-weight: 600;
}

.character__location,
.character__episode {
  display: flex;
  flex-direction: column;
}

.character__location p:first-child,
.character__episode p:first-child {
  font-weight: 600;
  color: rgb(158, 158, 158);
}



@media (max-width:599px){
  .character{
    flex-direction: column;
  }

  .character__image img{
    width: 100%;
    max-height: 400px;
  }
}

</style>
