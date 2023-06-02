import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { selectAuthToken } from '@/store/authSlice'
import { Bill } from '@/types/bill'
import { Group } from '@/types/group'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function NewBill() {
  const authToken = useSelector(selectAuthToken)
  const router = useRouter()

  const { groupID } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<Group.item>()
  const [bill, setBill] = useState<Bill.create>({
    tag: '',
    paymentWeb: '',
    expirationDay: 0,
    reference: '',
  })

  useEffect(() => {
    const loadGroupInfo = async () => {
      if (!groupID) return
      try {
        const groupInfo = await API.get(
          'bills',
          `/groups/${groupID}`,
          headerAuthToken(authToken)
        )
        if (!groupInfo) router.replace('/400')
        const IS_USER_DEFAULT_GROUP =
          groupInfo.data.groupID === groupInfo.data.name
        if (IS_USER_DEFAULT_GROUP) {
          groupInfo.data.name = 'your personal group'
        }
        setGroup(groupInfo.data)
      } catch (error) {
        onError(error)
      }
    }
    loadGroupInfo()
    setIsLoading(false)
  }, [authToken, groupID, router])

  function validateForm() {
    return bill.tag && bill.paymentWeb && bill.expirationDay && bill.reference
  }

  async function handleSubmit(_event: any) {
    setIsLoading(true)
    try {
      await API.post('bills', '/bills', {
        body: {
          groupID: groupID,
          ...bill,
        },
        ...headerAuthToken(authToken),
      })
      router.push('/')
    } catch (e) {
      onError(e)
    }
    setIsLoading(false)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setBill((prevBill: any) => ({
      ...prevBill,
      [name]: name == 'expirationDay' ? Number(value) : value,
    }))
  }

  const renderNewBillForm = () => {
    return (
      <>
        <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2, mb: 2 }}>
          {group && 'Create Bill for ' + group.name}
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
              label='Tag'
              value={bill.tag}
              name='tag'
              onChange={handleInputChange}
            />
            <TextField
              margin='dense'
              id='standard-basic'
              variant='standard'
              label='Payment Web'
              value={bill.paymentWeb}
              name='paymentWeb'
              onChange={handleInputChange}
            />
            <TextField
              margin='dense'
              id='standard-basic'
              variant='standard'
              type='number'
              label='Expiration Day'
              value={bill.expirationDay}
              name='expirationDay'
              onChange={handleInputChange}
            />
            <TextField
              margin='dense'
              id='standard-basic'
              variant='standard'
              label='Reference'
              value={bill.reference}
              name='reference'
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

  return (
    <>
      {/* authToken ? renderNewBillForm() : renderLander() */}
      {renderNewBillForm()}
    </>
  )
}
