<template>
  <div>
    动态创建实例
    <button @click="makeVM">click me</button>
  </div>
</template>

<script>
  import Toast from './toast.vue'
  import Vue from 'vue'
  export default {
    name:'toast-demo',
    components:{ Toast },
    methods:{
      makeVM(){
        console.log('new vm')
        console.log(Toast)
        const constructor = Vue.extend(Toast)
        console.log(constructor)
        let toast = new constructor({})
        toast.$mount()
        this.$el.appendChild(toast.$el)
      }
    }
  }
</script>

<style lang="scss">

</style>
