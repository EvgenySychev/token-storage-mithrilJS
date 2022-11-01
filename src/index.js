import m from "mithril";
import {v4 as uuidv4} from 'uuid';

const root = document.body

let data = {
    token: {
        list: [],
        fetch: () => {
            m.request({
                method: "GET",
                url: "../data.json",
            })
                .then(function (items) {
                    data.token.list = items
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

    data.token.list.push({
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
        data.token.list = data.token.list.filter(f => f.id !== t.id)
        m.route.set('/tokens', {})
    } else {
        m.route.set('/tokens', {})
    }
}

const DataTable = {

    view: () => {
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
                data.token.list.map(t => m('tr', [
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

const AddTokenPage = {
    view: () => m('div',
        m('table',
            m('thead',
                m('tr', [
                        m('th', "Domain name"
                        ),
                        m('th', "Organization name"
                        ),
                        m('th', "Action"
                        )
                    ]
                ),
            ),
            m('tbody',
                m('tr', [
                    m('td', m('input', {
                            placeholder: 'Type domain...',
                            value: domainName,
                            oninput: oninputDomain
                        })
                    ),
                    m('td', m('input', {
                            placeholder: 'Type organization name...',
                            value: organizationName,
                            oninput: oninputOrganizationName
                        })
                    ),
                    m('td', m('button', {onclick: addToken}, 'ADD')
                    ),
                    ]
                )
            )
        )
    )
}

const TokenList = {
    view: () => m('div',
        m(DataTable),
    )
}

const Layout = {
    oninit: data.token.fetch,
    view: (vnode) => m('div',
        [
            m('button', {onclick: () => m.route.set('/tokens', {})}, 'Token List'),
            m('button', {onclick: () => m.route.set('/add-token', {})}, 'Add Token Page'),
        ],
        m('div', vnode.children),
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