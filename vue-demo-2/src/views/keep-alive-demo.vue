<template>
  <div>
    <h1> keep-alive </h1>
    <div>{{msg}}</div>
    <div>{{count}}</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
  export default {
    name: 'test-keep-alive',
    data() {
      return {
        msg: 'test-keep-alive',
        count: 0,
      }
    },
    beforeCreate() {
      console.log('before create')
    },
    created() {
      console.log('created')
    },
    beforeMount() {
      console.log('before mount')
    },
    mounted() {
      console.log('mounted')
    },
    activated() {
      if(!this.$route.meta.isBack){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        console.log('获取数据')
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false
      console.log('activated')
    },
    deactivated() {
      console.log('deactivated')
    },
    methods: {
      add() {
        this.count = this.count + 1
      }
    }
  }
</script>

<style>

</style>
