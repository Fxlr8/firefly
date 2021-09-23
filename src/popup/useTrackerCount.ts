import { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'
import sendAction from '../utils/sendAction'

const useTrackerCount = (tabId?: number) => {
    const [count, setCount] = useState<number>(0)

    // request tabs tracker count on tab change
    useEffect(() => {
        if (!tabId) return

        sendAction({
            type: 'syncTrackerCount',
            tabId
        })
    }, [tabId])

    // listen to tab tracker count change
    useEffect(() => {
        const listener = (message: Action, sender: browser.Runtime.MessageSender) => {
            if (sender.id !== browser.runtime.id) return
            if (message.type !== 'trackerCountUpdate') return
            if (message.tabId !== tabId) return

            setCount(message.value)
        }

        browser.runtime.onMessage.addListener(listener)

        return () => {
            browser.runtime.onMessage.removeListener(listener)
        }
    }, [tabId])

    return count
}

export default useTrackerCount