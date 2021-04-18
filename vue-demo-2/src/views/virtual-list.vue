<template>
  <div class="list-view" @scroll="handleScroll">
    <div
      class="list-view-phantom"
      :style="{height:contentHeight+'px'}"
    ></div>
    <div ref="content" class="list-view-content" :style="{height:'100%'}">
      <div
        class="list-view-item"
        v-for="item in visibleData"
        :style="{height: itemSizeGetter(item) + 'px'}">
        {{item.value}}
      </div>
    </div>
<!--    {{contentHeight}}-->
  </div>
</template>

<script>
  export default {
    name: 'virtual-list',
    props: {
      data: {
        type: Array,
        require: true
      },
      itemHeight: {
        type: Number,
        default: 30
      },
      itemSizeGetter: {
        type: Function
      }
    },
    computed: {
      // 计算整个虚拟列表的真正的高度
      contentHeight() {
        const {data, itemSizeGetter} = this
        let total = 0
        for (let i = 0, j = data.length; i < j; i++) {
          total += itemSizeGetter.call(null, data[i], i)
        }
        return total
      },
    },
    mounted() {
      this.updateVisibleData()
    },
    data() {
      return {
        visibleData: [],
        lastMeasuredIndex: -1,
        startIndex: 0,
        sizeAndOffsetCache: {}
      }
    },
    methods: {
      // 更新可见元素,
      // this.$el.clientHeight -- 元素内部的高度，
      // this.$el.scrollTop -- 获取一个元素的内容垂直滚动的像素数
      // 一个元素的 scrollTop 是这个元素的内容顶部到他的视口可视内容的底部的距离
      updateVisibleData(scrollTop) {
        scrollTop = scrollTop || 0
        // console.log(scrollTop)
        const start = this.findNearestItemIndex(scrollTop)
        const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight)
        // console.log(this.$el.scrollTop,this.$el.clientHeight)
        // console.log('start',start)
        // console.log('end',end)
        this.visibleData = this.data.slice(
          start,
          Math.min(end + 1, this.data.length)
        )
        this.$refs.content.style.webkitTransform = `translate3d(0,${
          this.getItemSizeAndOffset(start).offset
        }px,0)`
      },
      // 处理鼠标滚动事件
      handleScroll() {
        const scrollTop = this.$el.scrollTop
        // console.log(this.$el)
        // console.log(this.$el.scrollTop)
        // console.log(0,scrollTop)
        this.updateVisibleData(scrollTop)
      },
      // 计算可视区域的起始索引和结束索引
      findNearestItemIndex(scrollTop) {
        const {data, itemSizeGetter} = this
        let total = 0
        for (let i = 0, j = data.length; i < j; i++) {
          const size = this.getItemSizeAndOffset(i).size
          // 从下标为0的项开始累加
          // 直到累加的长度 大于等于 scrollTop 或者
          // 说明这一项已经出现在可视区域内了
          total += size
          if (total >= scrollTop || i === j - 1) {
            return i
          }
        }
        // 最开始的时候 scrollTop 为 0，而第一项是有高度的
        return 0
      },
      // 通过索引计算，获取某个列表项相对于整个列表的 top
      getItemSizeAndOffset(index) {
        const {
          data,
          itemSizeGetter,
          lastMeasuredIndex,
          sizeAndOffsetCache
        } = this
        // 如果用户最后一次滑动位置的 index 比当前 index 要大，说明已经滑动过了，缓存里面有，直接用
        if (lastMeasuredIndex >= index) {
          return sizeAndOffsetCache[index]
        }
        let offset = 0
        // 初始化 lastMeasuredIndex = -1 的时候不执行，mounted 之后才执行
        // 计算最后一次计算尺寸的 offset，后面的offset以此为基准累加。
        if (lastMeasuredIndex >= 0) {
          const lastMeasured = sizeAndOffsetCache[lastMeasuredIndex]
          if (lastMeasured) {
            offset = lastMeasured.offset + lastMeasured.size
          }
        }
        for (let i = lastMeasuredIndex + 1; i <= index; i++) {
          const item = data[i]
          const size = itemSizeGetter.call(null, item, i)
          sizeAndOffsetCache[i] = {
            size,
            offset
          }
          offset += size
        }
        this.lastMeasuredIndex = index
        return sizeAndOffsetCache[index]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-view {
    /* 列表元素 */
    height: 400px;
    overflow: auto;
    position: relative;
    color: #333;
    border: 1px solid #aaa;
  }
  .list-view-phantom {
    /* 不可见元素用于撑起整个列表, 使得列表的滚动条出现 */
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .list-view-content {
    /* 列表的可见元素使用绝对定位 */
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
  }
  .list-view-item {
    padding: 5px;
    color: #666;
    line-height: 30px;
    box-sizing: border-box;
  }
</style>
