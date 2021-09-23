import browser from 'webextension-polyfill'
import { parse } from 'tldts'

console.log('HELLO BACKGROUND')

const logURL = (requestDetails: browser.WebRequest.OnBeforeRequestDetailsType): void => {
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

    console.log(message, sender)
})

browser.webRequest.onBeforeRequest.addListener(
    logURL,
    { urls: ["<all_urls>"] }
);


