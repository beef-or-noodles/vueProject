import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mainIndex from '@/components/manage/mainIndex'
Vue.use(Router)

  const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve => require(['@/components/view/index.vue'],resolve),
      // redirect:'/list',
      meta:{title:'首页'},
      children:[{
          path: '/content',
          name: 'content',
          component:resolve => require(['@/components/view/content.vue'],resolve),
          meta:{title:'文章'},
        },{
          path: '/list/:id',
          name: 'list',
          component:resolve => require(['@/components/view/list.vue'],resolve),
          meta:{title:'列表'},
        }
      ]
    },{
      path:'*',
      name:'404',
      component:resolve => require(['@/components/404'],resolve),
      meta:{title:'404'},
    },{
      path:'/login',
      name:'login',
      component:resolve => require(['@/components/manage/login/login.vue'],resolve),
      meta:{title:'登陆'},
    }
  ]
});
// 后台菜单路由
export function menuRouter(pageData){
  let routerList = [];
  for(let item of pageData){
    let rootList = item.rootMainList;
    if(item.power){
      for(let f of rootList){
        if(f.rootPower){
          routerList.push({
            path:f.path,
            name:f.name,
            component:(resolve) => require(['@/components'+f.rootPath+'.vue'],resolve),
            meta:{'title':f.rootChildName,'rootLogin':f.rootLogin}
          })
        }
      }
    }
  }
  router.addRoutes([{
      path:'/home',
      name:'home',
      component:mainIndex,
      meta:{'rootLogin':true},
      children:routerList
  }]);
}
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
