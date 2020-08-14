<template>
  <div id="app">
    <notifications group="mainHolder" class="my-style"/>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
    .my-style {
        margin-top: 3em;
    }
</style>
