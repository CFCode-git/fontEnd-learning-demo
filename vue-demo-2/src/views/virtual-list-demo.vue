<template>
  <div class="demo">
    <virtual-list :data="data" :item-size-getter="itemSizeGetter"></virtual-list>
  </div>
</template>

<script>
  import virtualList from './virtual-list.vue'

  export default {
    name: 'virtual-list-demo',
    components: {
      virtualList
    },
    data() {
      const data = []
      for (let i = 0; i < 10000; i++) {
        data.push({value: 1})
      }
      return {
        data
      }
    },
    methods: {
      itemSizeGetter(item) { // 根据 item 计算每一个高度, 传一个获取 item 高度的办法，解除对每个元素固定高度的限制
        return 30 + (item.value % 10)
      }
    }
  }
</script>

<style lang="scss">

</style>
