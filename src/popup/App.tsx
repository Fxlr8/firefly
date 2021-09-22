import React, { FC, useEffect } from 'react'
import browser from 'webextension-polyfill'

const App: FC = () => {
    useEffect(() => {
        browser.runtime.sendMessage({
            data: 'popup mounted'
        })

        return () => {
            console.log('cleanup')
            browser.runtime.sendMessage({
                data: 'popup unmounted'
            })
        }
    }, [])

    return (
        <div>
            Hello world!
        </div>
    )
}

export default App