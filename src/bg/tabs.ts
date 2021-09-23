import { parse } from 'tldts'
import browser from 'webextension-polyfill'

interface Site {
    hostname?: string,
    trackers: Set<string>
}

const tabs = new Map<number, Site>()

interface TabUpdateOptions {
    url?: string
}

const updateOrCreateTab = (tabId: number, options: TabUpdateOptions) => {
    const urlData = parse(options.url || '')
    const hostname = urlData.hostname!

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

    console.log(tabs)
}

const handleNewFrame = (requestDetails: browser.WebRequest.OnBeforeRequestDetailsType) => {
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

export default tabs