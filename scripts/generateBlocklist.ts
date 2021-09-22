import { promises as fs } from 'fs'
import fetch from 'node-fetch'

const Categories = [
    'Ad Motivated Tracking',
    'Advertising',
    'Ad Fraud',
    'Analytics',
    'Audience Measurement',
    'Federated Login',
    'SSO',
    'Third-Party Analytics Marketing',
    'Social - Comment',
    'Social - Share',
    'Online Payment',
    'Action Pixels',
    'Unknown High Risk Behavior',
    'Obscure Ownership',
    'CDN',
    'Badge',
    'Embedded Content',
    'Session Replay',
    'Social Network',
    'Non-Tracking',
    'Malware'
]

const AllowCategories = [
    'CDN',
    'Non-Tracking'
]

// https://github.com/duckduckgo/tracker-radar/blob/main/docs/CATEGORIES.md
const BlockCategories = [
    'Ad Motivated Tracking',
    'Advertising',
    // 'Ad Fraud', allow ad fraud checkers that don't include tracking
    'Action Pixels',
    'Malware',
    'Unknown High Risk Behavior',
    'Obscure Ownership',
    'Third-Party Analytics Marketing',
    'Audience Measurement'
]

const FingerprintingThreshold = 2

// type Location = 'AU'| 'CA'| 'CH'| 'DE'| 'FR'| 'NL'| 'NO'| 'US'

const isTracker = (data: Domain): boolean => {
    return (
        (
            data.fingerprinting >= FingerprintingThreshold // block fingerprinters
            ||
            BlockCategories.some(c => data.categories.includes(c)) // block suspicious categories
            ||
            data.cookies > 0.0003 // block significant cookie setters
        )
        && data.prevalence > 0.0003 // don't block insignificant stuff
        && !AllowCategories.some(c => data.categories.includes(c)) // don't block good stuff
    )
}

/**
 * Loads and processes domain data for a given region
 */
const analyzeRegion = async (region: string): Promise<Domain[]> => {

    const domains = await fs.readdir(`tmp/tracker-radar/domains/${region}`)
    // console.log(domains)
    const foundTrackers: Domain[] = []

    const tasks = domains.map(async (domain) => {
        const data = await loadDomain(region, domain)

        if (isTracker(data)) {
            foundTrackers.push(data)
        }
    })

    await Promise.all(tasks)

    console.log({
        region,
        all: domains.length,
        foundTrackers: foundTrackers.length,
    })

    return foundTrackers
}

const generateBlocklist = async () => {
    const trackers = new Set<string>()

    const myCategoriesStats = new Map<string, number>()


    const regions = ['US'] //await fs.readdir('tmp/tracker-radar/domains')
    for (let i = 0; i < regions.length; i++) {
        console.log(`analyzing ${regions[i]} region...`)
        const result = await analyzeRegion(regions[i])

        // counting how many resources of each category is included into my list
        result.forEach(tracker => {
            if (trackers.has(tracker.domain)) return // avoid duplicates

            tracker.categories.forEach(c => {
                const count = myCategoriesStats.get(c) || 0
                myCategoriesStats.set(c, count + 1)
            })

            if (tracker.categories.length === 0) {
                const count = myCategoriesStats.get('none') || 0
                myCategoriesStats.set('none', count + 1)
            }
        })

        result.forEach(tracker => trackers.add(tracker.domain))
    }

    console.log('Resource categories of my list')
    console.log(myCategoriesStats)

    compareToDDGList(trackers, 'https://staticcdn.duckduckgo.com/trackerblocking/v2.1/tds.json')
    compareToDDGList(trackers, 'https://staticcdn.duckduckgo.com/trackerblocking/lm/tds.json')

    await fs.writeFile('public/trackers.json', JSON.stringify([...trackers.values()]))
}

const compareToDDGList = async (myList: Set<string>, list: string) => {
    console.log('downloading DuckDuckGo block list to compare')
    const DDGListResult = await fetch(list)
    const DDGList: any = await DDGListResult.json()

    const DDGCategories = new Map<string, number>()

    Object.keys(DDGList.trackers).forEach(tracker => {
        if (!DDGList.trackers[tracker].categories || DDGList.trackers[tracker].categories.length === 0) {
            const count = DDGCategories.get('none') || 0
            DDGCategories.set('none', count + 1)
        } else {
            DDGList.trackers[tracker].categories.forEach((c: string) => {
                const count = DDGCategories.get(c) || 0
                DDGCategories.set(c, count + 1)
            })
        }
    })

    console.log('Resource categories of DuckDuckGo list')
    console.log(DDGCategories)

    console.log('results:')
    console.log({
        myTrackers: myList.size,
        DDGTrackers: Object.keys(DDGList.trackers).length,
        intersection: Object.keys(DDGList.trackers).filter(d => myList.has(d)).length
    })

}

const loadDomain = async (location: string, file: string): Promise<Domain> => {
    const data = await fs.readFile(`tmp/tracker-radar/domains/${location}/${file}`, { encoding: 'utf8' })
    return JSON.parse(data)
}

// loadData()
generateBlocklist()

export default {}