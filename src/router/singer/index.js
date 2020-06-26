const _import = require('@/router/import-setting.js');

export default [
  {
    path: '/singer',
    name: 'singer',
    component: _import('singer/index')
  }
]