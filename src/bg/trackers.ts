import blockList from '../../generated/trackers.json'
import { parse } from 'tldts'

const trackers = new Set(blockList)

interface TrackerCheckData {
    hostname: string
    requestUrl: string
    allowList: Set<string>
    blockList: Set<string>
}

interface TrackerCheckResponse {
    block: boolean
    isTracker: boolean
    reason: 'allowListRule' | 'blockListRule' | 'firstParty' | 'nonTracker'
}

const checkTracker = ({ hostname, requestUrl, allowList, blockList }: TrackerCheckData): TrackerCheckResponse => {
    const { hostname: reqHostname, domain: reqDomain } = parse(requestUrl)
    const { domain } = parse(hostname)

    const isTracker = blockList.has(reqDomain!)
    const isFirstParty = domain === reqDomain
    const isAllowed = allowList.has(hostname)

    if (isAllowed) {
        return {
            block: false,
            isTracker,
            reason: 'allowListRule'
        }
    }

    if (isFirstParty) {
        return {
            block: false,
            isTracker,
            reason: 'firstParty'
        }
    }

    if (isTracker) {
        return {
            block: true,
            isTracker,
            reason: 'blockListRule'
        }
    }

    return {
        block: false,
        isTracker,
        reason: 'nonTracker'
    }
}

export default trackers
export {
    checkTracker
}
