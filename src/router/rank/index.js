const _import = require('@/router/import-setting.js');

export default [
    {
        path: '/rank',
        name: 'rank',
        component: _import('rank/index')
    }
]