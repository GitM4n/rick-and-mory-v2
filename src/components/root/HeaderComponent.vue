<script setup lang="ts">

</script>


<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <nav class="header__nav">
                    <ul class="header__list">
                        <li class="header__item">
                            <router-link :to="{name: 'home'}" >
                                    Characters
                            </router-link>
                        </li>
                        <li class="header__item">
                            <router-link :to="{name: 'episodes'}">
                                    Episodes
                            </router-link>
                        </li>
                       
                        <li class="header__item">
                            <router-link :to="{name: 'locations'}">
                                Locations
                            </router-link>                        
                        </li>
                    </ul>
                </nav>
                <h2 class="header__title">
                   <slot>The Rick and Morty</slot>
                </h2>
                <slot name="filter"></slot>
            </div>    
        </div>
    </header>
</template>



<style scoped>


a{
    text-decoration: none;
    color: inherit;
}

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

.header__nav{
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);

}

.header__list{
    display: flex;
    gap: 50px;
}


.header__item{
    position: relative;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: rgb(51, 51, 51);
    font-size: 2.4rem;
    font-weight: 900;
    line-height: 1.2;
    transition: all .2s ease-in-out;
}



.header__item::after{
    content: '';
    position: absolute;
    width: 0%;
    height: 3px;
    background: rgb(32, 35, 41);
    transition: width .2s ease-in-out;
    top: 100%;
    left: 0;
}

.header__item:hover::after{
    width: 100%;
}
   




@media (max-width:599px){ 
    .header__title{
        font-size: 5rem;
    }

    .header__list{
        gap: 20px;
    }

    
}

</style>