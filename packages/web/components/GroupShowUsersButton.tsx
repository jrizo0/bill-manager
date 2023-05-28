import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { selectAuthToken } from '@/store/authSlice'
import { Group } from '@/types/group'
import { user } from '@/types/user'
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteButton from './DeleteButton'
import { LoadingButton } from '@mui/lab'

type props = {
  group: Group.item
  isLoading: boolean
  userInfo: user

  onDeleteUser: (input: { groupID: string; email: string }) => Promise<any>
}

const GroupShowUsersButton = (props: props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<user[]>()
  const authToken = useSelector(selectAuthToken)

  const getUsersOfGroup = async () => {
    setIsLoading(true)
    try {
      const response = await API.get(
        'bills',
        `/groups/${props.group.groupID}/users`,
        headerAuthToken(authToken)
      )
      setUsers(response.data)
    } catch (e) {
      onError(e)
    }
    setIsLoading(false)
  }

  const handleClickOpen = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    await getUsersOfGroup()
    setOpen(true)
  }

  const handleClose = () => {
    !isLoading && setOpen(false)
  }

  const deleteUser = async (input: { groupID: string; email: string }) => {
    setIsLoading(true)
    await props.onDeleteUser({ groupID: input.groupID, email: input.email })
    handleClose()
    setIsLoading(false)
  }

  return (
    <>
      <LoadingButton
        variant='outlined'
        onClick={handleClickOpen}
        loading={props.isLoading || isLoading}
        disabled={props.isLoading || isLoading}
      >
        Show users
      </LoadingButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Users in group {props.group.name}</DialogTitle>
        <DialogContent dividers>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {users &&
              users.map((user, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  disablePadding
                  divider={true}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ListItemText primary={`Name: ${user.name}`} />
                    <ListItemText primary={`Email: ${user.email}`} />
                  </Box>
                  {props.userInfo && props.userInfo.userID !== user.userID && (
                    <Box sx={{ ml: 'auto', pl: 3 }}>
                      {props.isLoading ? (
                        <CircularProgress size={20} sx={{ py: 'auto' }} />
                      ) : (
                        <DeleteButton
                          confirmMsg={`Do you want to delete ${user.name} from the group?`}
                          onConfirm={() => {
                            deleteUser({
                              groupID: props.group.groupID,
                              email: user.email,
                            })
                          }}
                        />
                      )}
                    </Box>
                  )}
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GroupShowUsersButton
