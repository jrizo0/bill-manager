import { BillManager } from './entities'

export * as User from './user'

export async function login(input: {
  userID: string
  name: string
  email: string
}) {
  let user = await get({ userID: input.userID })

  if (user.data) {
    return user.data
  }

  return await create(input)
}

export async function create(input: {
  userID: string
  name: string
  email: string
}) {
  await BillManager.transaction
    .write(({ user, group, membership }) => [
      user
        .create({
          userID: input.userID,
          name: input.name,
          email: input.email,
        })
        .commit(),
      group
        .create({
          name: input.userID,
          groupID: input.userID,
        })
        .commit(),
      membership
        .create({
          userID: input.userID,
          groupID: input.userID,
        })
        .commit(),
    ])
    .go()
    .then((val) => val.data)
    .catch((reason) => {
      throw new Error(reason)
    })
  return input
}

export async function get(input: { userID: string }) {
  return BillManager.entities.user
    .get({
      userID: input.userID,
    })
    .go()
}

export async function remove(input: { userID: string }) {
  return BillManager.entities.user
    .delete({
      userID: input.userID,
    })
    .go()
}

export async function listUsersForGroup(input: { groupID: string }) {
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

export async function userCanAccessGroup(input: {
  groupID: string
  userID: string
}) {
  if(input.userID === input.groupID) return

  return listUsersForGroup(input)
    .then((users) => {
      if(!!users.data.membership.find(
        (user) => user.userID === input.userID
      )){
        throw new Error("You can't access this group")
      }
    })
}
