import { BillManager } from './entities'

export * as User from './user'

export async function login(input: {
  userID: string
  name: string
  email: string
}) {
  try {
    let user = await get({ userID: input.userID })

    if (user) return user

    return await create(input)
  } catch (error) {
    throw new Error('login failed')
  }
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
    .then((value) => value.data!)
}

export async function queryByEmail(input: { email: string }) {
  return BillManager.entities.user.query
    .email({
      email: input.email,
    })
    .go()
    .then((value) => value.data!.at(0))
}

export async function remove(input: { userID: string }) {
  return BillManager.entities.user
    .delete({
      userID: input.userID,
    })
    .go()
}

export async function listUsersForGroup(input: { groupID: string }) {
  const data = await BillManager.collections
    .members({
      groupID: input.groupID,
    })
    .go({ order: 'desc' })

  const usersIDs = data.data!.membership.map((val) => {
    return { userID: val.userID }
  })

  return BillManager.entities.user.get(usersIDs).go({ concurrency: 1 })
}

export async function userCanAccessGroup(input: {
  groupID: string
  userID: string
}) {
  if (input.userID === input.groupID) return

  const usersForGroup = await listUsersForGroup(input)

  const inGroup = usersForGroup.data.find(
    (user) => user.userID === input.userID
  )

  if (!inGroup) {
    throw new Error("You can't access this group")
  }
}
