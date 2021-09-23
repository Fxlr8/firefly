import { parse } from 'tldts'
import sendAction from '../utils/sendAction'
import browser from 'webextension-polyfill'

const tabs = new Map<number, Site>()

interface TabUpdateOptions {
    url?: string
}

const updateOrCreateTab = (tabId: number, options: TabUpdateOptions) => {
    const urlData = parse(options.url || '')
    const domain = urlData.domain
    const hostname = domain ? urlData.hostname : null

    let tab = tabs.get(tabId)

    if (!tab) {
        tab = {
            hostname,
            trackers: new Set()
        }
        tabs.set(tabId, tab)
    } else if (tab.hostname !== hostname) {
        tab.hostname = hostname
        tab.trackers = new Set()
    }

    // notify popup state when site trackers count changes
    sendTrackerCountUpdateAction(tabId, tab)
}

const handleNewFrame = (requestDetails: browser.WebRequest.OnBeforeRequestDetailsType) => {
    console.log(`tab handler for r:${requestDetails.requestId}`)
    console.log('frame', requestDetails)
    const { tabId, url } = requestDetails

    updateOrCreateTab(tabId, { url })
}

// delete tab when browser removes it
browser.tabs.onRemoved.addListener((tabId) => {
    tabs.delete(tabId)
})

// listen to 'main_frame' requests to update tab info
browser.webRequest.onBeforeRequest.addListener(
    handleNewFrame,
    {
        urls: ["<all_urls>"],
        types: ['main_frame']
    }
);

const init = async () => {
    const tabs = await browser.tabs.query({})
    tabs.forEach(tab => {
        if (!tab.id) return
        updateOrCreateTab(tab.id, { url: tab.url })
    })
}
init()

const sendTrackerCountUpdateAction = (tabId: number, tab?: Site) => {
    if (!tab) {
        tab = tabs.get(tabId)
    }
    if (tab) {
        sendAction({
            type: 'trackerCountUpdate',
            tabId,
            value: tab.trackers.size
        } as TrackerCountUpdateAction)
    }
}

export default tabs
export { updateOrCreateTab, sendTrackerCountUpdateAction }