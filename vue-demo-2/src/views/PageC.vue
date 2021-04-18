<template>
  <div>
    PageC
    <button @click="toPageB">to Page B</button>
    <div class="calculator">
      <div class="count">{{ count }}</div>
      <div class="operator">
        <button @click="add1">+1</button>
        <button @click="add2">+2</button>
        <button @click="add3">+3</button>
        <button @click="add4">+4</button>
        <button @click="add5">+5</button>
        <button @click="subtractC">-</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "PageC",
  data() {
    return {
      xxx: "fromPageC",
    };
  },
  computed: {
    count() {
      return this.$store.state.c.Count;
    },
  },
  methods: {
    toPageB() {
      this.$router.push({ name: "PageB", params: { xxx: "fromPageC" } });
    },
    ...mapActions({
      add1: "actionA",
      add2: "actionB",
    }),
    add3() {
      this.$store.dispatch({
        type:'actionC',
        num:3
      })
    },
    add4() {
      this.$store.dispatch("actionD").then(() => {
        console.log("actionD 会得到一个promise");
      });
    },
    add5() {
      this.$store.dispatch("actionE");
    },
    subtractC() {
      this.$store.commit("subtractC", { num: 1 });
    },
  },
  beforeRouteEnter (to, from, next) {
    console.log('in page c beforeRouteEnter')
    console.log('to >>',to)
    console.log('from >>',from)
    next((vm)=>{
      console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('in page c beforeRouteUpdate')
    console.log('to >>',to)
    console.log('from >>',from)
    console.log(this.xxx)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('in page c beforeRouteLeave')
    console.log('to >>',to)
    console.log('from >>',from)
    console.log(this.xxx)
    next()
  }
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
