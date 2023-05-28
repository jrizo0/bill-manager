import { Group } from '@/types/group'
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import ListItem from '@mui/material/ListItem'
import DeleteButton from './DeleteButton'
import GroupAddUserButton from './GroupAddUserButton'
import GroupShowUsersButton from './GroupShowUsersButton'
import { user } from '@/types/user'

type props = {
  isLoading: boolean
  group: Group.item
  userInfo: user
  groupIndex: number

  onDeleteGroup: (input: { groupID: string; groupIndex: number }) => void
  onAddUser: (input: { groupID: string; email: string }) => Promise<any>
  onDeleteUser: (input: { groupID: string; email: string }) => Promise<any>
}

const GroupListItem = (props: props) => {
  return (
    <>
      <ListItem
        sx={{
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        divider={true}
      >
        <Typography>{props.group.name}</Typography>

        <Box sx={{ ml: 'auto', display: 'flex' }}>
          <GroupShowUsersButton {...props} />

          <GroupAddUserButton group={props.group} onAddUser={props.onAddUser} />

          {props.isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <DeleteButton
              confirmMsg={`Are you sure you want to delete "${props.group.name}"?`}
              onConfirm={() => {
                props.onDeleteGroup({
                  groupID: props.group.groupID,
                  groupIndex: props.groupIndex,
                })
              }}
            />
          )}
        </Box>
      </ListItem>
    </>
  )
}

export default GroupListItem
