import React, { FC, useEffect } from 'react'
import browser from 'webextension-polyfill'
import useAppState from './useAppState'
import useAllowList from './useAllowList'
import Switch from './Switch'

const App: FC = () => {
    const [allowList, allowDomain, unallowDomain] = useAllowList()

    const { domain } = useAppState()

    const enabled = !allowList.includes(domain!)

    return (
        <div>
            <div>{domain}</div>
            Hello world!
            <Switch active={enabled} onClick={enabled ? () => allowDomain(domain) : () => unallowDomain(domain)} />
            <div>
                {allowList.map((domain) => (<div key={domain}>{domain}</div>))}
            </div>
        </div>
    )
}

export default App