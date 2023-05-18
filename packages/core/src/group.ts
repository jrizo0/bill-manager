import {
  BillManager,
  CreateGroupItem,
  GroupItem,
  GroupQueryResponse,
} from './entities'

export * as Group from './group'

export async function create(item: CreateGroupItem): Promise<GroupItem> {
  return BillManager.entities.group
    .create(item)
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function get(input: {
  groupID: string
}): Promise<GroupQueryResponse> {
  return BillManager.entities.group.query
    .group({
      groupID: input.groupID,
    })
    .go()
    .then((items) => items)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function update(input: {
  groupID: string
  name: string | undefined
}) {
  const newProperties = Object.fromEntries(
    Object.entries(input).filter(([_, value]) => value != undefined)
  )
  if (Object.keys(newProperties).length === 0) return 'No info provided'

  return BillManager.entities.group
    .patch({
      groupID: input.groupID,
    })
    .set(newProperties)
    .go()
}

export async function remove(input: { groupID: string }): Promise<GroupItem> {
  return BillManager.entities.group
    .delete({
      groupID: input.groupID,
    })
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function addUserGroup(input: { groupID: string; userID: string }) {
  return BillManager.entities.membership
    .create({
      groupID: input.groupID,
      userID: input.userID,
    })
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function listGroupsOfUser(input: { groupID: string }) {
  return BillManager.collections
    .members({
      groupID: input.groupID,
    })
    .go()
    .then((items) => items)
    .catch((reason) => {
      throw new Error(reason)
    })
}
