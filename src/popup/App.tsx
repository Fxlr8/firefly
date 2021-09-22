import React, { FC, useEffect } from 'react'
import browser from 'webextension-polyfill'
import useAppState from './useAppState'

const App: FC = () => {
    const { documentUrl } = useAppState()

    return (
        <div>
            <div>{documentUrl}</div>
            Hello world!
        </div>
    )
}

export default App