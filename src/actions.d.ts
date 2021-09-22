interface SyncAction {
    type: 'sync'
}

interface AllowListAddAction {
    type: 'allowListAdd',
    payload: string
}

interface AllowListRemoveAction {
    type: 'allowListRemove',
    payload: string
}

type Action = SyncAction | AllowListAddAction | AllowListRemoveAction