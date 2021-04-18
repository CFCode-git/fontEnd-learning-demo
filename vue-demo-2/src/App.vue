<template>
  <div id="app">
    <router-link to="/">Home</router-link> |
    <router-link to="/page-a">PageA</router-link> |
    <router-link to="/page-b/index">PageB</router-link> |
    <router-link to="/page-c">PageC test Router</router-link> |
    <router-link to="/test-alive">test alive</router-link> |
    <router-link to="/virtual-list-demo">virtual list demo</router-link> |
    <router-link to="/test-slot-demo">test slot demo</router-link> |
    <router-link to="/test-is-component-demo">动态组件：test is component demo</router-link> |
    <router-link to="/toast-demo">动态创建实例</router-link> |
    <router-link to="/transition-demo">vue transition 动画 demo</router-link> |
    <router-link to="/directive-demo">directive 自定义指令 demo</router-link> |
    <router-link to="/plugin-demo">plugin 插件 demo</router-link>
    <div>
      <keep-alive include="test-keep-alive">
<!--      <keep-alive>-->
        <router-view></router-view>
<!--        <router-view v-if="$route.meta.keepAlive"></router-view>-->
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
