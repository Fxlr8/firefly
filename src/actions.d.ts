interface SyncTrackerCountAction {
    type: 'syncTrackerCount'
    tabId: number
}

interface AllowListChangeAction {
    type: 'allowListChange',
}

interface TrackerCountUpdateAction {
    type: 'trackerCountUpdate',
    tabId: number,
    value: number
}

type Action = SyncTrackerCountAction | AllowListChangeAction | TrackerCountUpdateAction