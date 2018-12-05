import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{title:'首页'},
    },
    {
      path:'*',
      name:'404',
      component:resolve => require(['@/components/404'],resolve),
      meta:{title:'404'},
    }
  ]
})
