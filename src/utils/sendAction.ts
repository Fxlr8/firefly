import browser from 'webextension-polyfill'

const sendAction = async (action: Action) => {
    // message sending can fail if popup is closed
    // this is not a problem
    browser.runtime.sendMessage(undefined, action).catch(e => { })
}

export default sendAction