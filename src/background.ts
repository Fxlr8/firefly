import browser from 'webextension-polyfill'
import tabs from './bg/tabs'
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

    console.log(`request handler for r:${requestId}`)

    if (!tabId) return

    const tab = tabs.get(tabId)

    if (!tab) {
        console.warn('Received request to an untracked tab', requestDetails)
        return
    }

    console.log(`Received ${type} request from tab:${tabId}:${tab.hostname}`)

    if (!tab.hostname) {
        return
    }

    const result = checkTracker({
        hostname: tab.hostname,
        requestUrl: url,
        blockList: trackers,
        allowList
    })

    console.log(url, result)

    if (result.isTracker) {
        const trackerHostname = parse(url).hostname
        if (trackerHostname) {
            tab.trackers.add(trackerHostname!)
            console.log(tab)
        }
    }

    if (result.block) {
        return {
            cancel: true
        }
    }
    // console.log(requestDetails)

    // const requestData = {
    //     url: requestDetails.url,
    //     third: requestDetails.thirdParty,
    //     tld: parse(requestDetails.url),
    //     tabId: requestDetails.tabId,
    //     firstParty: requestDetails.documentUrl,
    //     type: requestDetails.type,
    // }
    // console.log(requestData)
}

const sendState = async () => {

}

const reloadTab = async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    if (tabs.length) {
        browser.tabs.reload(tabs[0].id)
    }
}

browser.runtime.onMessage.addListener((message: Action, sender) => {
    // only listen to own messages
    if (sender.id !== browser.runtime.id) return

    if (!message) return

    console.log(message, sender)

    switch (message.type) {
        case 'sync': {
            return sendState()
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


