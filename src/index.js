import m from "mithril";

let root = document.body

const StickyTable = {
    view() {
        return m('table.sticky-table',
            m('thead',
                m('tr', [
                        m('th', "data.domain"
                        ),
                        m('th', "data.value"
                        ),
                        m('th', "data.organizationName"
                        )
                    ]
                ),
            ),
            m('tbody', [
                    m('tr', [
                            m('td', '22222'
                            ),
                            m('td', '111111'
                            ),
                            m('td', '44444444'
                            ),
                            m('td', '7777'
                            )
                        ]
                    ),
                    m('tr', [
                            m('td', '5555555555'
                            ),
                            m('td', '777777777'
                            ),
                            m('td', '8888888'
                            ),
                            m('td', '9999999'
                            )
                        ]
                    )
                ]
            )
        )
    }
}

let AddTokenPage = {
    view: () => m('p', 'Add Token Page')
}

let TokenList = {
    view: () => m('div',
        m(StickyTable),
    )
}
let DeleteToken = {
    view: () => m('p', 'Delete Token')
}

let Layout = {
    view: (vnode) => m('div',
        [
            /*  m('button',*/
            m('button', {onclick: () => m.route.set('/tokens', {})}, 'Token List'),
            /*m('a[href=/token-storage-mithriljs/#!/tokens]', {oncreate: m.route.link}, 'Token List')),*/

            m('button', {onclick: () => m.route.set('/add-token', {})}, 'Add Token Page'),
            m('a[href=/token-storage-mithriljs/#!/delete]', {oncreate: m.route.link}, 'Delete'),

        ],
        m('.layout', vnode.children)
    )
}

m.route(root, '/tokens', {
    '/tokens': {
        render: () => m(Layout, m(TokenList))
    },
    '/add-token': {
        render: () => m(Layout, m(AddTokenPage))
    },
    '/delete': {
        render: () => m(Layout, m(DeleteToken))
    }
})