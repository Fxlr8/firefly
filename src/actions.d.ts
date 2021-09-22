interface SyncAction {
    type: 'sync'
}

interface AllowListChangeAction {
    type: 'allowListChange',
}

type Action = SyncAction | AllowListChangeAction