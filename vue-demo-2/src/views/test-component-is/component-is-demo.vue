<template>
  <div>
    <button @click="switchComponent">switch</button>
    <div
      v-for="(content,index) in openListValue"
      :key="index"
    >    
      <!-- component标签创建动态组件，is属性指向谁，就显示哪个组件 -->     
      <component
        :is="content.type===`${componentName}`?content.component:''"  
        :key="content.index"
        :ref="content.refName"
        :type="content.type"
        :ref-name="content.refName"
      >
      </component>
    </div>
  </div>
</template>

<script>
  import {openModules} from './config.js'

  export default {
    name: 'component-is-demo',
    data() {
      return {
        openList: [],
        openListValue: [],
        index: 0,
        componentName: 'a',
      }
    },
    mounted() {
      this.openList = openModules(this)[0]
      console.log(this.openList)
      this.openListValue = this.openList.modules
    },
    methods: {
      switchComponent() {
        this.index++
        switch (this.index) {
          case 0:
            this.componentName = 'a'
            break
          case 1:
            this.componentName = 'b'
            break
          case 2:
            this.componentName = 'c'
            break
          default:
            break
        }
        if (this.index === 3) {
          this.index = 0
          this.componentName = 'a'
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
