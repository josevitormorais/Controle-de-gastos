
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        name: 'categoriaPesquisa',
        path: '/privado/categoria/pesquisa',
        component: () => import('pages/privado/categoria/CategoriaPesquisa.vue')
      },
      {
        name: 'lancamentoPesquisa',
        path: '/privado/lancamento/pesquisa',
        component: () => import('pages/privado/lancamento/lancamentoPesquisa.vue')
      },
      {
        name: 'lancamentoCadastro',
        path: '/privado/lancamento/cadastro',
        component: () => import('pages/privado/lancamento/lancamentoCadastro.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
