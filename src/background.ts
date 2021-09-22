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

browser.runtime.onMessage.addListener((message: Action, sender) => {
    // only listen to own messages
    if (sender.id !== browser.runtime.id) return

    if (!message) return

    console.log(sender?.tab?.url)

    switch (message.type) {
        case 'sync': {
            return sendState()
        }
        default: console.warn('Unknown action', message)

    }

    console.log(message, sender)
})

browser.webRequest.onBeforeRequest.addListener(
    logURL,
    { urls: ["<all_urls>"] }
);


