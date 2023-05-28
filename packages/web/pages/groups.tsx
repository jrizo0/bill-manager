import GroupListItem from '@/components/GroupListItem'
import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { selectAuthToken } from '@/store/authSlice'
import { Group } from '@/types/group'
import { user } from '@/types/user'
import { Box, List, ListItemButton } from '@mui/material'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Groups = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<Group.item[]>()
  const [userInfo, setUserInfo] = useState<user>()
  const authToken = useSelector(selectAuthToken)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await API.get(
          'bills',
          `/user`,
          headerAuthToken(authToken)
        )
        setUserInfo(response)
      } catch (e) {
        onError(e)
      }
    }
    async function onLoad() {
      try {
        const response = await API.get(
          'bills',
          '/groups/user',
          headerAuthToken(authToken)
        )
        setGroups(response.data)
      } catch (e) {
        onError(e)
      }
    }
    if (!authToken) return
    onLoad()
    if (!userInfo) getUserInfo()
    setIsLoading(false)
  }, [authToken, userInfo])

  const addUser = async (input: { groupID: string; email: string }) => {
    setIsLoading(true)
    try {
      await API.post('bills', '/groups/user', {
        ...headerAuthToken(authToken),
        body: {
          groupID: input.groupID,
          email: input.email,
        },
      })
    } catch (error) {
      onError(error)
    }
    setIsLoading(false)
  }

  const removeUser = async (input: { groupID: string; email: string }) => {
    setIsLoading(true)
    try {
      await API.del('bills', '/groups/user', {
        ...headerAuthToken(authToken),
        body: {
          groupID: input.groupID,
          email: input.email,
        },
      })
    } catch (error) {
      onError(error)
    }
    setIsLoading(false)
  }

  const deleteGroup = async (input: {
    groupID: string
    groupIndex: number
  }) => {
    setIsLoading(true)
    try {
      await API.del('bills', '/groups', {
        ...headerAuthToken(authToken),
        body: {
          groupID: input.groupID,
        },
      })
      const newGroups = groups?.filter(
        (_g, index) => index !== input.groupIndex
      )
      setGroups(newGroups)
    } catch (error) {
      onError(error)
    }
    setIsLoading(false)
  }

  function renderBillsList() {
    return (
      <>
        <List
          sx={
            {
              // width: 400, justifyContent: 'center'
            }
          }
        >
          <ListItemButton
            divider={true}
            href='/groups/new'
            sx={{ py: 2, borderRadius: '10px', my: 2 }}
          >
            <BsPencilSquare size={17} />
            <Box mx={{ marginInlineStart: 4, fontWeight: 'bold' }}>
              Create a new group
            </Box>
          </ListItemButton>
          {groups &&
            groups.map((group: Group.item, index: number) => {
              if (group.name !== group.groupID && userInfo)
                return (
                  <GroupListItem
                    key={index}
                    isLoading={isLoading}
                    group={group}
                    userInfo={userInfo}
                    onAddUser={addUser}
                    onDeleteUser={removeUser}
                    groupIndex={index}
                    onDeleteGroup={deleteGroup}
                  />
                )
            })}
        </List>
      </>
    )
  }

  return <>{renderBillsList()}</>
}

export default Groups
