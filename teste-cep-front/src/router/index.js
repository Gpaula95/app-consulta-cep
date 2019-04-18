import Vue from 'vue'
import Router from 'vue-router'
import buscaCep from '@/components/buscaCep'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'buscaCep',
      component: buscaCep
    }
  ]
})
