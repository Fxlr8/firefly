import React, { FC, useEffect } from 'react'
import browser from 'webextension-polyfill'
import useAppState from './useAppState'
import Switch from './Switch'

const App: FC = () => {
    const { domain } = useAppState()

    return (
        <div>
            <div>{domain}</div>
            Hello world!
            <Switch active={true} onClick={() => console.log('click')} />
        </div>
    )
}

export default App