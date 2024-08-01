<script setup lang="ts">

</script>


<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <h2 class="header__title">
                   <slot>The Rick and Morty</slot>
                </h2>
                <slot name="filter"></slot>
            </div>    
        </div>
    </header>
</template>



<style scoped>
.header{
    background: rgb(241, 241, 241);
   
}

.header__inner{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
}

.header__title{
    color: rgb(32, 35, 41);
    font-size: 8rem;
    text-wrap: balance;
    text-align: center;
    font-weight: 900;
}




@media (max-width:599px){ 
    .header__title{
        font-size: 5rem;
    }
    
}

</style>