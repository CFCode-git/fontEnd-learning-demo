<template>
  <div>
    plugin-demo
    <button @click="open">show</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import plugin from './myPlugin.js'
  Vue.use(plugin)
  export default {
    name:'plugin-demo',
    methods:{
      open(){
        this.$toast()
      }
    }
  }
</script>

<style lang="scss"></style>
