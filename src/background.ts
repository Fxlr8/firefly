import 'webextension-polyfill'
import { parse } from 'tldts'

console.log('HELLO BACKGROUND')


const logURL = (requestDetails: browser.webRequest._OnBeforeRequestDetails): void => {
    const requestData = {
        url: requestDetails.url,
        third: requestDetails.thirdParty,
        tld: parse(requestDetails.url)
    }
    console.log(requestData)
}

browser.webRequest.onBeforeRequest.addListener(
    logURL,
    { urls: ["<all_urls>"] }
);


