const _import = require('@/router/import-setting.js');

export default [
    {
        path: '/search',
        name: 'search',
        component: _import('search/index')
    }
]