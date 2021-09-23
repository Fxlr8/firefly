import React, { FC, useEffect } from 'react'
import useTrackerCount from './useTrackerCount'
import useAllowList from './useAllowList'
import useTabInfo from './useTabInfo'
import Switch from './Switch'

const App: FC = () => {
    const [allowList, allowDomain, unallowDomain] = useAllowList()

    const [hostname, tabId] = useTabInfo()

    const trackerCount = useTrackerCount(tabId)

    const enabled = !allowList.includes(hostname!)

    return (
        <div>
            <div>{hostname}</div>
            <div>{trackerCount}</div>
            Hello world!
            <Switch active={enabled} onClick={enabled ? () => allowDomain(hostname) : () => unallowDomain(hostname)} />
            <div>
                {allowList.map((hostname) => (<div key={hostname}>{hostname}</div>))}
            </div>
        </div>
    )
}

export default App