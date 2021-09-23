import { useEffect, useState, useCallback } from 'react'
import browser from 'webextension-polyfill'
import { parse } from 'tldts'

const useTabInfo = (): [string | undefined, number | undefined] => {
    const [tabId, setTabId] = useState<number>()
    const [hostname, setHostname] = useState<string>()

    const updateHostname = useCallback(async (id?: number, url?: string) => {
        if (typeof id === 'undefined') return
        console.log('updating hostname for tab', id)

        if (!url) {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true })
            console.log('tabs', tabs)
            const tab = tabs[0]
            if (tab && tab.id) {
                if (tab.url) {
                    url = tab.url
                }
            }
        }

        console.log('tab data', id, url)

        const { hostname, domain } = parse(url || '')

        if (hostname && domain) {
            console.log(url, hostname)
            setHostname(hostname)
        } else {
            if (!domain) {
                setHostname(undefined)
            }
        }
    }, [])

    // get initial state
    useEffect(() => {
        browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            const tab = tabs[0]
            if (tab && tab.id) {
                setTabId(tab.id)
            }
        })
    }, [])

    // subscribe to tab activation
    useEffect(() => {
        const listener = (info: browser.Tabs.OnActivatedActiveInfoType) => {
            console.log('tab activation', info)
            if (info.tabId) {
                setTabId(info.tabId)
            }
        }
        browser.tabs.onActivated.addListener(listener)

        return () => {
            browser.tabs.onActivated.removeListener(listener)
        }
    }, [])

    // subscribe to tab update
    useEffect(() => {
        const listener = (updatedTabId: number, info: browser.Tabs.OnUpdatedChangeInfoType) => {
            console.log('tab update', updatedTabId, info)
            updateHostname(updatedTabId, info.url)
        }
        browser.tabs.onUpdated.addListener(listener)

        return () => {
            browser.tabs.onUpdated.removeListener(listener)
        }
    }, [])

    useEffect(() => {
        updateHostname(tabId)
    }, [tabId])

    useEffect(() => {
        console.log('STATE', {
            tabId,
            hostname
        })
    }, [tabId, hostname])
    return [hostname, tabId]
}

export default useTabInfo