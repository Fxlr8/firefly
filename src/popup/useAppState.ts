import { useEffect, useState } from 'react'
import { parse } from 'tldts'
import browser from 'webextension-polyfill'

interface AppState {
    domain?: string
    blockedTrackers?: number
    allowList: string[]
}

const useAppState = (): AppState => {
    const [domain, setDomain] = useState<string>()
    const [blockedTrackers, setBlockedTrackers] = useState<number>(0)
    const [allowList, setAllowList] = useState<string[]>([])

    useEffect(() => {
        browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            const tab = tabs[0]
            if (tab && tab.url) {
                const { domain } = parse(tab.url)

                if (domain) {
                    console.log(tab.url, domain)
                    setDomain(domain)
                }
            }
        })
    }, [])

    useEffect(() => {
        const listener = (message: AppState, sender: browser.Runtime.MessageSender) => {
            console.log('popup new message', message)
            if (sender.id !== browser.runtime.id) return

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
        domain,
        blockedTrackers,
        allowList
    }
}

export default useAppState