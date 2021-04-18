<template>
  <div>
    PageA
    <button @click="toPageC">to Page C</button>
    <div class="calculator">
      <div class="count">{{ count }}</div>
      <div class="operator">
        <button @click="addA">+</button>
        <button @click="subtractA">-</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageA",
  computed: {
    count() {
      return this.$store.state.a.Count;
    },
  },
  methods: {
    toPageC() {
      this.$router.push({
        path: "/page-c",
        query: { name: "hihi", age: "18" },
      });
    },
    addA() {
      this.$store.commit("addA", { num: 3 });
    },
    subtractA() {
      this.$store.commit("subtractA", { num: 7 });
    },
  },
};
</script>

<style lang="scss">
.calculator {
  border: 1px solid red;
  margin: 24px;
  background: pink;
  .count {
    border: 1px solid #ddd;
    padding: 24px;
    margin: 24px;
    font-size: 24px;
    color: red;
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
