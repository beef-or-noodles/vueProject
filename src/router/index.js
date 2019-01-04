import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

  const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld,
      meta:{title:'首页'},
    },
    {
      path:'*',
      name:'404',
      component:resolve => require(['@/components/404'],resolve),
      meta:{title:'404'},
    }
  ]
});
//page路由
export function pageRouter(pageData){
  let pageList = []
  for(let item of pageData){
    if(item.power){ //判断是否有权限
      pageList.push({
        path:item.path,
        name:item.name,
        component:(resolve) => require(['@/components'+item.routerPath+'.vue'],resolve),
        meta:{'title':item.routerName}
      })
    }
  };
  router.addRoutes(pageList);
}
export default router
