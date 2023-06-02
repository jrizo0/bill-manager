import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { selectAuthToken } from '@/store/authSlice'
import { addGroup } from '@/store/billSlice'
import { Group } from '@/types/group'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function NewBill() {
  const authToken = useSelector(selectAuthToken)
  const dispatch = useDispatch()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<Group.create>({
    name: '',
  })

  useEffect(() => {
    setIsLoading(false)
  }, [])

  function validateForm() {
    return !!group.name
  }

  async function handleSubmit(_event: any) {
    setIsLoading(true)
    try {
      const data: Group.item = await API.post('bills', '/groups', {
        body: group,
        ...headerAuthToken(authToken),
      })
      const newGroup: Group.item = {
        name: group.name,
        groupID: data.groupID,
      }
      dispatch(addGroup({ group: newGroup }))
      router.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setGroup((prevGroup: any) => ({
      ...prevGroup,
      [name]: value,
    }))
  }

  const renderNewGroupForm = () => {
    return (
      <>
        <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2, mb: 2 }}>
          Create a new group
        </Typography>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
          spacing={2}
          sx={{ my: 2 }}
        >
          <FormControl fullWidth sx={{ maxWidth: 600 }}>
            <TextField
              margin='dense'
              id='standard-basic'
              variant='standard'
              label='Name'
              value={group.name}
              name='name'
              onChange={handleInputChange}
            />
            <br />
            <LoadingButton
              size='large'
              variant='contained'
              color='success'
              loading={isLoading}
              disabled={!validateForm()}
              onClick={handleSubmit}
            >
              Create
            </LoadingButton>
          </FormControl>
        </Stack>
      </>
    )
  }

  return <>{renderNewGroupForm()}</>
}
