<template>
  <div>
    <h1>作用域插槽，允许父组件访问子组件的数据。</h1>
<!--    <test-slot :users="users">-->
<!--      <template v-slot:firstName="users"> {{users.firstName}} </template>-->
<!--    </test-slot>-->
    <test-slot2>
      <template v-slot="slotProps">
        {{slotProps.slotData.title}}
      </template>
    </test-slot2>
  </div>
</template>

<script>
  import testSlot from './test-slot.vue'
  import testSlot2 from './test-slot-2.vue'

  export default {
    name: 'test-slot-demo',
    components: {
      testSlot,
      testSlot2
    },
    data() {
      return {
        users: [
          {id: 1, firstName: 'Jay', lastName: 'Zhou'},
          {id: 2, firstName: 'Jason', lastName: 'John'},
          {id: 3, firstName: 'Bob', lastName: 'Chris'},
        ]
      }
    },
  }
</script>

<style lang="scss"></style>
