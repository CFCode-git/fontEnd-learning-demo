const open = function () {
  const vm = this
  return [
    {
      modules: [
        {
          id: 'a',
          refName: 'a',
          type: 'a',
          component: () => import('./is-a')
        },
        {
          id: 'b',
          refName: 'b',
          type: 'b',
          component: () => import('./is-b')
        },
        {
          id: 'c',
          refName: 'c',
          type: 'c',
          component: () => import('./is-c')
        }
      ]
    }
  ]
}

export const openModules = vm => {
  return open.call(vm)
}
