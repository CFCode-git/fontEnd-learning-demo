import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'

Vue.prototype.$api = api // 将 api 挂载到 Vue 的原型上 方便调用

/* 调用示例

methods: {
    onLoad(id) {
        this.$api.article.articleDetail(id, {
            api: 123
        }).then(res=> {
            // 执行某些操作
        })
    }
}

*/


/* 断网处理

<template>
    <div id="app">
        <div v-if="!network">
            <h3>我没网了</h3>
            <div @click="onRefresh">刷新</div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'App',
        computed: {
            ...mapState(['network'])
        },
        methods: {
            // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
            onRefresh () {
                this.$router.replace('/refresh')
            }
        }
    }
</script>


// refresh.vue
beforeRouteEnter (to, from, next) {
    next(vm => {
        vm.$router.replace(from.fullPath)
    })
}

断网情况下，加载断网组件，不加载对应页面的组件。
当点击刷新的时候，我们通过跳转 refresh 页面然后立即返回的方式来实现重新获取数据的操作。
因此我们需要新建一个refresh.vue页面，并在其beforeRouteEnter钩子中再返回当前页面。


 */
