<template>
  <ul>
    <li v-for="user in users">
      <slot :user="user">
        {{user.id}}
      </slot>
      <slot name="firstName" :firstName="user">
        {{user.firstName}}
      </slot>
      <slot name="lastName" :user="user">
        {{user.lastName}}
      </slot>
    </li>
  </ul>
</template>

<script>
  export default {
    name:'test-slot',
    props:['users']
  }
</script>

<style lang="scss">

</style>
