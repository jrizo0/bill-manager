import { onError } from '@/lib/errorLib'
import { Group } from '@/types/group'
import { LoadingButton } from '@mui/lab'
import { Input, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type props = {
  group: Group.item

  onAddUser: (input: { groupID: string; email: string }) => Promise<any>
}

const GroupAddUserButton = (props: props) => {
  const [userEmail, setUserEmail] = useState<string>()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen(true)
  }

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation()
    setUserEmail(event.target.value)
  }

  const handleClose = () => {
    !isLoading && setOpen(false)
  }

  const handleAddUser = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (!userEmail) return
    setIsLoading(true)
    try {
      await props.onAddUser({
        groupID: props.group.groupID,
        email: userEmail,
      })
    } catch (error) {
      onError(error)
    }
    setIsLoading(false)
    handleClose()
  }

  return (
    <>
      <Button variant='text' onClick={handleClickOpen} sx={{ mx: 2 }}>
        <PersonAddIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add user to {props.group.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the email of the user</DialogContentText>
          <Input
            type='string'
            sx={{ mt: 1 }}
            onChange={handleUserEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            disabled={isLoading || !userEmail}
            onClick={handleAddUser}
          >
            Add user
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GroupAddUserButton
