const _import = require('@/router/import-setting.js');

export default [
    {
        path: '/recommend',
        name: 'recommend',
        component: _import('recommend/index')
    }
]