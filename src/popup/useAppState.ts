import { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'

interface AppState {
    documentUrl?: string
    blockedTrackers?: number
    allowList: string[]
}

const useAppState = (): AppState => {
    const [url, setUrl] = useState<string>()
    const [blockedTrackers, setBlockedTrackers] = useState<number>(0)
    const [allowList, setAllowList] = useState<string[]>([])

    useEffect(() => {
        const listener = (message: AppState, sender: browser.Runtime.MessageSender) => {
            console.log('popup new message', message)
            if (sender.id !== browser.runtime.id) return

            if ('documentUrl' in message) {
                setUrl(message.documentUrl)
            }

            if ('blockedTrackers' in message) {
                setBlockedTrackers(message.blockedTrackers!)
            }

            if (message.allowList) {
                setAllowList(message.allowList)
            }
        }
        browser.runtime.onMessage.addListener(listener)

        browser.runtime.sendMessage(undefined, {
            type: 'sync',
        } as Action)

        // cleaning up on component unmount
        return () => {
            browser.runtime.onMessage.removeListener(listener)
        }
    }, [])

    return {
        documentUrl: url,
        blockedTrackers,
        allowList
    }
}

export default useAppState