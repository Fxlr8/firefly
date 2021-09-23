import browser from 'webextension-polyfill'
import tabs, { sendTrackerCountUpdateAction } from './bg/tabs'
import trackers, { checkTracker } from './bg/trackers'
import { parse } from 'tldts'


// TODO: add do not track header

const allowList: Set<string> = new Set()
const updateAllowList = async () => {
    const { allowList: storageAllowList } = await browser.storage.local.get('allowList')

    allowList.clear()

    if (storageAllowList && storageAllowList.length) {
        storageAllowList.forEach((host: string) => allowList.add(host))
    }
}

const handleRequest = (requestDetails: browser.WebRequest.OnBeforeRequestDetailsType) => {
    const {
        url,
        tabId,
        type,
        requestId
    } = requestDetails

    // console.log(`request handler for r:${requestId}`)

    if (!tabId || tabId < 0) return

    const tab = tabs.get(tabId)

    if (!tab) {
        console.warn('Received request to an untracked tab', requestDetails)
        return
    }

    // console.log(`Received ${type} request from tab:${tabId}:${tab.hostname}`)

    if (!tab.hostname) {
        return
    }

    const result = checkTracker({
        hostname: tab.hostname,
        requestUrl: url,
        blockList: trackers,
        allowList
    })

    // console.log(url, result)

    if (result.isTracker) {
        const trackerHostname = parse(url).hostname
        if (trackerHostname) {
            tab.trackers.add(trackerHostname!)
            // notify popup window on site's tracker count change
            sendTrackerCountUpdateAction(tabId, tab)
        }
    }

    if (result.block) {
        return {
            cancel: true
        }
    }
}

const getCurrentTab = async (): Promise<browser.Tabs.Tab | void> => {
    const foundTabs = await browser.tabs.query({ active: true, currentWindow: true })
    if (foundTabs.length && foundTabs[0].id) {
        return foundTabs[0]
    }
}

const reloadTab = async () => {
    const tab = await getCurrentTab()
    if (tab && tab.id) {
        browser.tabs.reload(tab.id)
    }
}

browser.runtime.onMessage.addListener((message: Action, sender) => {
    // only listen to own messages
    if (sender.id !== browser.runtime.id) return

    if (!message) return

    console.log(message, sender)

    switch (message.type) {
        case 'syncTrackerCount': {
            // responding with tracker count to popup request
            return sendTrackerCountUpdateAction(message.tabId)
        }
        case 'allowListChange': {
            console.log('Allow list changed')
            return reloadTab()
        }
        default: console.warn('Unknown action', message)

    }
    console.log(tabs)
})

browser.webRequest.onBeforeRequest.addListener(
    handleRequest,
    { urls: ["<all_urls>"] },
    ['blocking']
);


