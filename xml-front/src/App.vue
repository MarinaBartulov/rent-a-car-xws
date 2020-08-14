<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="mainHolder" class="my-style"/>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
.my-style {
        margin-top: 5em;
    }
</style>
