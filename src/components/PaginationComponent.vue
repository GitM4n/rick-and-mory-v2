<script setup lang="ts">
import {computed, ref, watch} from 'vue'

const props = defineProps<{
    currentPage: number,
    pagesArr: number[]
}>()

const emit = defineEmits<{
    (e: 'update', value: number): void
}>()

const inputPage = ref<number>(props.currentPage)


watch(props, () => {
  inputPage.value = props.currentPage
})



const newArr = computed(()=>{

  if(props.pagesArr.length < 6) return props.pagesArr

    
  if(props.currentPage > 3 && props.currentPage < props.pagesArr.length-3){
  	return [...[props.pagesArr[0],'...', ...props.pagesArr.slice(props.currentPage -2,props.currentPage+2),'...', props.pagesArr[props.pagesArr.length-1]]]
  }else if(props.currentPage  <=3){
    return  [...[...props.pagesArr.slice(0,4),'...', props.pagesArr[props.pagesArr.length-1]]]
  }else{
    return	[...[props.pagesArr[0],'...', ...props.pagesArr.slice(-5)]]
  }
})


const emitValue = (page:number|string) =>{
  if(typeof page === 'number'){
    emit('update', page)
  }

}




const updatePage = (page: number) => {
  if(page > props.pagesArr.length){
     emitValue(props.pagesArr[props.pagesArr.length-1])
     return
   }

   if(page < 1){
     emitValue(1)
     return
   }


}




</script>


<template>
  <div class="pagination">
      <ul class="pagination__counts">
        <li class="pagination__count" v-for="page in newArr" :key="page" 
            :class="{active: page === currentPage, dots: page === '...'}" 
            @click="emitValue(page)"
            >{{page}}</li>
      </ul>
      <div class="pagination__controls">
        <button class="prev" @click="updatePage(currentPage-1)"></button>
        <button class="next" @click="updatePage(currentPage+1)"></button>
      </div>
      
      <div class="pagination__input">
        <label for="page">Enter page</label>
        <input id="page" type="number" v-model="inputPage" @keyup.enter="updatePage(inputPage)">
      </div>
  </div>
 
    
</template>

<style scoped>
  .pagination{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px
  }

  .pagination__count{
      font-size: 2.8rem;
  }
  
  .pagination__count:not(.dots):hover{
    cursor: pointer;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.774);
  }
  
  .pagination__count.active{
    font-weight: 900;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.774);
  }
  
  
  
  .pagination__counts{
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .pagination__controls{
    display: none;
  }

  .pagination__input{
    display: flex;
    gap: 10px;
  }

  input{
    width: 50px;
    height: 30px;
    border: 2px solid gray;
    border-radius: 5px;
    outline: none;
    background: transparent;
    color: gray;
    font-size: 2rem;
    padding: 5px 10px;
    transition: all .2s ease-in-out;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:hover,
  input:focus{
    border: 2px solid white;
    color: white;
  }

  label{
    font-size: 2.5rem;
    color: white;
    line-height: 1;
    transition: all .2s ease-in-out;
  }


  @media screen and (max-width: 900px) {
 
    .pagination__counts{
      max-width: 100px;
      margin: 0 auto;
      justify-content: center;
      overflow: hidden;
      
    }
    .pagination__count{
      display: none;
    }
  
    .pagination__count.active{
      display: block;
      text-align: center
    }

    .pagination__controls{
      display: flex;
      gap: 80px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 10px;
    }


    .next,
    .prev{
      height: 20px; 
      width: 20px;
      border: 2px solid white;
      border-width: 4px 4px 0 0;
      transform: rotate(45deg);
      background: transparent;
      outline: none;
    }

    .prev{
      transform: scale(-1, 1) rotate(45deg);
    }

    

    
  }


</style>