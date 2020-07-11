import Vue from 'vue'
import Router from 'vue-router'

const Search = () => import('@/components/Search/Search');
const Me = () => import('@/components/Me/Me');
const Account = () => import('@/components/Account/Account');
const Play = () => import('@/components/Play/Play');
const Comment = () => import('@/components/Comment/Comment');
const Mv = () => import('@/components/Mv/Mv');

Vue.use(Router)

export default new Router({
  routes: [
    {
      	path: '/',
      	redirect: '/search'
    },
    {
    	path: '/search',
    	name: 'search',
    	component: Search
    },
    {
    	path: '/me',
      	name: 'me',
      	component: Me
    },
    {
      path: '/account',
        name: 'account',
        component: Account
    },
    {
    	path: '/paly',
    	name: 'play',
    	component: Play
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/mv',
      name: 'mv',
      component: Mv
    }
  ]
})
