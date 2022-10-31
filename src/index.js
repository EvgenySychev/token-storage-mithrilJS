import m from "mithril";
import {v4 as uuidv4} from 'uuid';

let root = document.body

let data = [
    {
        "id": 1,
        "domain": "https://tra-ta-ta1.ru",
        "value": "1234-4567-8901-0000",
        "organizationName": "One"
    },
    {
        "id": 2,
        "domain": "https://tra-ta-ta2.ru",
        "value": "1234-4567-8902-0000",
        "organizationName": "Two"
    },
    {
        "id": 3,
        "domain": "https://tra-ta-ta3.ru",
        "value": "1234-4567-8903-0000",
        "organizationName": "Three"
    },
    {
        "id": 4,
        "domain": "https://tra-ta-ta4.ru",
        "value": "1234-4567-8904-0000",
        "organizationName": "Four"
    }
]

let domainName = null
let organizationName = null

const oninputOrganizationName = (e) => {
    organizationName = e.target.value
}

const oninputDomain = (e) => {
    domainName = e.target.value
}

const addToken = () => {
    data.push({
        id: uuidv4(),
        domain: domainName,
        value: '1234-4321',
        organizationName: organizationName
    })
}

const deleteToken = (t) => {
    alert('ADD')
    console.log(t)
}

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
                        ),
                        m('th', "action"
                        )
                    ]
                ),
            ),
            m('tbody',
                data.map(t => m('tr', [
                        m('td', t.domain
                        ),
                        m('td', t.value
                        ),
                        m('td', t.organizationName
                        ),
                        m('td', m('button', {onclick: () => deleteToken()}, "DELETE")
                        )
                    ]
                ))
            )
        )
    }
}

let AddTokenPage = {
    view: () => m('div', [
            m('input', {
                placeholder: 'Type domain...',
                oninput: oninputDomain
            }),
            m('input', {
                placeholder: 'Type organization name...',
                oninput: oninputOrganizationName
            }),
            m('button', {onclick: addToken}, 'ADD')
        ]
    )
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
            m('button', {onclick: () => m.route.set('/tokens', {})}, 'Token List'),
            m('button', {onclick: () => m.route.set('/add-token', {})}, 'Add Token Page'),
            m('button', {onclick: () => m.route.set('/delete', {})}, 'Delete'),
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