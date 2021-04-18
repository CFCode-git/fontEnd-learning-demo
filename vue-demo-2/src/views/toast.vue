<template>
  <div>
    <div :class="{toast:true,closing:closing}">
      <header>标题</header>
      <main>内容</main>
      <footer>
        <button @click="close">确定</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    data() {
      return {
        active: false,
        closing: false,
      }
    },
    methods: {
      close() {
        this.closing = true
        this.$nextTick(() => {
          this.$destroy()
          this.$el.onanimationend = () => {
            // console.log('动画完了')
            this.$el.remove()
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .toast {
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
    animation: slide-down 1s ease-in-out;
  }
  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translate(-50%, -80%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  .toast.closing {
    animation: slide-up 1s ease-in-out;
  }
  @keyframes slide-up {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -80%);
    }
  }
</style>
