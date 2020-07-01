const _import = require('@/router/import-setting.js');

export default [
  {
    path: '/singer',
    component: _import('singer/index'),
    children: [
      {
        path: '/singer/singerDetail/:id',
        component: _import('singer/singerDetail')
      }
    ]
  }
]