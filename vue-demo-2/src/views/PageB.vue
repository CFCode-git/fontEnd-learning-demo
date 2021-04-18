<template>
  <div>
    PageB
    <button @click="toPageA">to Page A</button>
    <div class="calculator">
      <div class="count">{{ count }}</div>
      <div class="operator">
        <button @click="addB">+</button>
        <button @click="subtractB">-</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageB",
  mounted() {},
  computed: {
    count() {
      return this.$store.state.b.Count;
    },
  },
  methods: {
    toPageA() {
      this.$router.push("/");
    },
    addB() {
      this.$store.commit("addB",{num:5});
    },
    subtractB() {
      this.$store.commit("subtractB",{num:2});
    },
  },
};
</script>
<style lang="scss">
.calculator {
  border: 1px solid blue;
  margin: 24px;
  background: yellow;
  .count {
    border: 1px solid #ddd;
    padding: 24px;
    margin: 24px;
    font-size: 24px;
    color: blue;
  }
  .operator {
    > button {
      width: 64px;
      height: 32px;
      font-size: 24px;
      margin: 12px;
    }
  }
}
</style>
