import { useEffect, useCallback, useState } from 'react'
import browser from 'webextension-polyfill'

type AllowListHookOutput = [
    string[],
    (domain?: string) => void,
    (domain?: string) => void
]

const notifyStorage = async () => {
    await browser.runtime.sendMessage(undefined, {
        type: 'allowListChange'
    } as AllowListChangeAction)
}

/**
 * Handles the state of the allow list and returns mehtods to modify it
 * Notifies background script on allow list change
 */
const useAllowList = (): AllowListHookOutput => {
    const [allowList, setAllowList] = useState<string[]>([])

    // load initial state
    useEffect(() => {
        browser.storage.local.get('allowList').then((({ allowList }) => {
            if (allowList && allowList.length) {
                setAllowList(allowList)
            }
        }))
    }, [])

    const allowDomain = useCallback((domain?: string) => {
        if (!domain) return
        if (!allowList.includes(domain)) {

            const newAllowList = [...allowList, domain]

            browser.storage.local.set({
                allowList: newAllowList
            })
                .then(notifyStorage)
                .then(() => setAllowList(newAllowList))
        }
    }, [allowList])

    const unallowDomain = useCallback((domain?: string) => {
        if (!domain) return
        if (allowList.includes(domain)) {

            const newAllowList = allowList.filter(d => d !== domain)

            browser.storage.local.set({
                allowList: newAllowList
            })
                .then(notifyStorage)
                .then(() => setAllowList(newAllowList))
        }
    }, [allowList])

    return [allowList, allowDomain, unallowDomain]
}

export default useAllowList