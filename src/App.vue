<template>
    <div id="app">
        <transition name="back">
            <keep-alive >
                <router-view/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
  
<style>
    html{
        height: 100%;
    }
    body{
        height: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
        height: 100%
    }
    body,ul,li{
        padding: 0px;
        margin: 0px;
    }
    .nav_bar{
        height: 10%;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #0d0d0f;
    }
    .nav_item{
        width: 33.3%;
        text-decoration: none; 
        color: #fff;
        display: flex;
        flex-direction: column;
    }
    .nav_item div{
        width: 30px;
        height: 30px;
        margin: auto;
    }
    .nav_item img{
        width: 30px;
        height: 30px;
    }
    .nav_item p{
        margin: 0px;
        font-size: 12px;
    }
    .router-link-active{
        color: #d93826;
    }
    .router-link-active div{
        border-radius: 50px;
        background: #d93826;
    }
    .router-link-active div img{
        width: 20px;
        height: 20px;
        margin: 5px;
        animation: router_link .5s;
    }
    @keyframes router_link{
        0%{
            transform: scale(.8);
        }
        100%{
            transform: scale(1);
        }
    }
</style>
