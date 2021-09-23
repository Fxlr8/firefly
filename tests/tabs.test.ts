import tabs, { updateOrCreateTab } from '../src/bg/tabs'
jest.mock('webextension-polyfill', () => ({
    tabs: {
        onRemoved: {
            addListener: () => { }
        },
        query: () => []
    },
    webRequest: {
        onBeforeRequest: {
            addListener: () => { }
        }
    }
}))
describe('updateOrCreateTab', () => {

    it('creates tab for TLD', () => {
        tabs.clear()

        updateOrCreateTab(1, { url: 'https://mozilla.org' })

        expect(tabs.size).toBe(1)
        expect(tabs.get(1)?.hostname).toBe('mozilla.org')
    })

    it('creates tab for subdomain', () => {
        tabs.clear()

        updateOrCreateTab(2, { url: 'https://developer.mozilla.org' })

        expect(tabs.size).toBe(1)
        expect(tabs.get(2)?.hostname).toBe('developer.mozilla.org')
    })

    it('creates blank tab without URL', () => {
        tabs.clear()

        updateOrCreateTab(3, { url: undefined })

        expect(tabs.size).toBe(1)
        expect(tabs.get(3)?.hostname).toBeNull()
    })

    it('creates blank tab with non-site url', () => {
        tabs.clear()

        updateOrCreateTab(3, { url: 'about:debugging#/runtime/this-firefox' })

        expect(tabs.size).toBe(1)
        expect(tabs.get(3)?.hostname).toBeNull()
    })

    it('creates multiple tabs', () => {
        tabs.clear()

        updateOrCreateTab(1, { url: 'https://mozilla.org' })
        updateOrCreateTab(2, { url: 'https://developer.mozilla.org' })
        updateOrCreateTab(3, { url: 'https://github.com' })
        updateOrCreateTab(1, { url: 'https://youtube.com' })

        expect(tabs.size).toBe(3)
    })

    it('tab hostname update resets the tracker list', () => {
        tabs.clear()

        updateOrCreateTab(1, { url: 'https://news.com' })
        tabs.get(1)?.trackers.add('https://tracker.evil')

        updateOrCreateTab(1, { url: 'https://github.com' })
        expect(tabs.size).toBe(1)
        const site = tabs.get(1)
        expect(site?.hostname).toBe('github.com')
        expect(site?.trackers.size).toBe(0)
    })

    it('same tab hostname update does not reset the tracker list', () => {
        tabs.clear()

        updateOrCreateTab(1, { url: 'https://news.com' })
        tabs.get(1)?.trackers.add('https://tracker.evil')

        updateOrCreateTab(1, { url: 'https://news.com' })
        expect(tabs.size).toBe(1)
        const site = tabs.get(1)
        expect(site?.hostname).toBe('news.com')
        expect(site?.trackers.size).toBe(1)
    })
})
