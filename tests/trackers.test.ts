import { checkTracker } from '../src/bg/trackers'

const trackerList = new Set(['tracker.evil', 'privacy.hell'])
const allowList = new Set(['stop-breaking-my.site'])

describe('tracker check function', () => {
    it('blocks third party tracker', () => {
        const result = checkTracker({
            hostname: 'mysite.com',
            requestUrl: 'https://tracker.evil?id=iseeyou',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(true)
        expect(result.isTracker).toBe(true)
        expect(result.reason).toBe('blockListRule')
    })

    it('allows third party tracker for allowListed site', () => {
        const result = checkTracker({
            hostname: 'stop-breaking-my.site',
            requestUrl: 'https://tracker.evil?id=iseeyou',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(true)
        expect(result.reason).toBe('allowListRule')
    })

    it('allows first party request to tracking site', () => {
        const result = checkTracker({
            hostname: 'privacy.hell',
            requestUrl: 'https://privacy.hell?id=iseeyou',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(true)
        expect(result.reason).toBe('firstParty')
    })

    it('treats tracking subdomain as first party', () => {
        const result = checkTracker({
            hostname: 'privacy.hell',
            requestUrl: 'https://track.privacy.hell?id=iseeyou',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(true)
        expect(result.reason).toBe('firstParty')
    })

    it('treats non-tracking subdomain as first party', () => {
        const result = checkTracker({
            hostname: 'mysite.com',
            requestUrl: 'https://api.mysite.com',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(false)
        expect(result.reason).toBe('firstParty')
    })

    it('allows non-tracking third party request', () => {
        const result = checkTracker({
            hostname: 'mysite.com',
            requestUrl: 'https://anothersite.com/kitten.jpg',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(false)
        expect(result.reason).toBe('nonTracker')
    })

    it('blocks third party request of a first party tracker', () => {
        const result = checkTracker({
            hostname: 'privacy.hell',
            requestUrl: 'https://tracker.evil?id=iseeyou',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(true)
        expect(result.isTracker).toBe(true)
        expect(result.reason).toBe('blockListRule')
    })

    it('allows non-tracking third party request of a first party tracker', () => {
        const result = checkTracker({
            hostname: 'privacy.hell',
            requestUrl: 'https://anothersite.com/kitten.jpg',
            blockList: trackerList,
            allowList
        })

        expect(result.block).toBe(false)
        expect(result.isTracker).toBe(false)
        expect(result.reason).toBe('nonTracker')
    })
})