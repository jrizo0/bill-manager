import { BillManager, CreateGroupItem, GroupItem } from './entities'

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

export async function get(input: { groupID: string }) {
  return BillManager.entities.group
    .get({
      groupID: input.groupID,
    })
    .go()
    .then((item) => item)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function update(input: {
  groupID: string
  name: string | undefined
}) {
  const newProperties = Object.fromEntries(
    Object.entries(input).filter(
      ([key, val]) => val !== undefined && !['groupID'].includes(key)
    )
  )
  if (Object.keys(newProperties).length === 0) return 'No info provided'

  return BillManager.entities.group
    .patch({
      groupID: input.groupID,
    })
    .set(newProperties)
    .go()
    .then((_) => 'Group updated')
    .catch((_) => {
      throw new Error('Could not update group')
    })
}

export async function remove(input: { groupID: string }) {
  return BillManager.entities.group
    .delete({
      groupID: input.groupID,
    })
    .go()
    .then((_) => 'Group deleted')
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

export async function removeUserGroup(input: {
  groupID: string
  userID: string
}) {
  return BillManager.entities.membership
    .delete({
      groupID: input.groupID,
      userID: input.userID,
    })
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

/*
NOTE: Without bash get:
export async function listGroupsOfUser(input: { userID: string }) {
  const data = await BillManager.collections
    .belong({
      userID: input.userID,
    })
    .go({ order: 'desc' })
  let result = []
  for (const membership of data.data.membership) {
    const info = await BillManager.entities.group
      .get({
        groupID: membership.groupID,
      })
      .go()
    result.push(info.data!)
  }
  return result
}
*/

export async function listGroupsOfUser(input: { userID: string }) {
  const data = await BillManager.collections
    .belong({
      userID: input.userID,
    })
    .go({ order: 'desc' })

  const groupsIDs = data.data!.membership.map((val) => {
    return { groupID: val.groupID }
  })

  return BillManager.entities.group.get(groupsIDs).go({ concurrency: 1 })
}
