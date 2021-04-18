<template>
  <div>
    <button @click="open">open</button>
    <transition name="slide">
      <div :class="{toast:true}" v-if="active">
        <header>标题</header>
        <main>内容</main>
        <footer>
          <button @click="close">确定</button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'test-transition',
    data() {
      return {
        active: false
      }
    },
    methods: {
      open() {
        this.active = true
      },
      close() {
        this.active = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .toast {
    //相当于 .slide-enter-to,.slide-leave{}
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 200px;
    min-width: 400px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .7);
    border-radius: 16px;
    display: flex;
    padding: 0 8px;
    flex-direction: column;
    header { border-bottom: 1px solid #333; padding: 8px; }
    main { flex-grow: 1; border-bottom: 1px solid #333; padding: 8px; }
    footer { padding: 8px; }
    transform: translate(-50%, -50%);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 300ms;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate(-50%, -80%);
  }
  //.slide-enter-to,.slide-leave{} // 相当于是最终状态
</style>
