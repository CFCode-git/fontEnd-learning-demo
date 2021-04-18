<template>
  <div>
    transition test
    <button @click="makeVM">click me</button>
    <toast></toast>
  </div>
</template>

<script>
  import Toast from './transition-toast.vue'
  export default {
    name:'transition-demo',
    components:{ Toast },
    methods:{ }
  }
</script>

<style lang="scss">

</style>
