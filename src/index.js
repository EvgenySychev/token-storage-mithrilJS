import m from "mithril";
import {v4 as uuidv4} from 'uuid';

let root = document.body

let Data = {
    token: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: "../data.json",
            })
                .then(function(items) {
                    Data.token.list = items
                    console.log(Data.token.list)
                })
        }
    }
}

let domainName = null
let organizationName = null

const oninputOrganizationName = (e) => {
    organizationName = e.target.value
}

const oninputDomain = (e) => {
    domainName = e.target.value
}

const addToken = () => {
    Data.token.list.push({
        id: uuidv4(),
        domain: domainName,
        value: uuidv4(),
        organizationName: organizationName
    })
    organizationName = ''
    domainName = ''
    alert('token was added')
    m.route.set('/tokens', {})
}

const deleteToken = (t) => {

    let deleteToken = confirm("delete token?")
    if (deleteToken) {
        Data.token.list = Data.token.list.filter(f => f.id !== t.id)
        m.route.set('/tokens', {})
    } else {
        m.route.set('/tokens', {})
    }
}

const StickyTable = {

    view() {
        return m('table.sticky-table',
            m('thead',
                m('tr', [
                        m('th', "Domain name"
                        ),
                        m('th', "Token"
                        ),
                        m('th', "Organization name"
                        ),
                        m('th', "Action"
                        )
                    ]
                ),
            ),
            m('tbody',
                Data.token.list.map(t => m('tr', [
                        m('td', t.domain
                        ),
                        m('td', t.value
                        ),
                        m('td', t.organizationName
                        ),
                        m('td', m('button', {onclick: () => deleteToken(t)}, "DELETE")
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
                value: domainName,
                oninput: oninputDomain
            }),
            m('input', {
                placeholder: 'Type organization name...',
                value: organizationName,
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

let Layout = {
    oninit: Data.token.fetch,
    view: (vnode) => m('div',
        [
            m('button', {onclick: () => m.route.set('/tokens', {})}, 'Token List'),
            m('button', {onclick: () => m.route.set('/add-token', {})}, 'Add Token Page'),
        ],
        m('.layout', vnode.children),
    )
}

m.route(root, '/tokens', {
    '/tokens': {
        render: () => m(Layout, m(TokenList))
    },
    '/add-token': {
        render: () => m(Layout, m(AddTokenPage))
    }
})