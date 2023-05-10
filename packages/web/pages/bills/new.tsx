import { onError } from '@/lib/errorLib'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

export default function NewBill() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [bill, setBill] = useState<any>({
    //TODO: Create bill for every user
    userID: '1',
    tag: '',
    paymentWeb: '',
    expirationDay: 0,
    reference: '',
  })

  function validateForm() {
    return bill.tag && bill.paymentWeb && bill.expirationDay && bill.reference
  }

  async function handleSubmit(event: any) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await createBill(bill)
      console.log(response)
      router.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  function createBill(bill: any) {
    return API.post('bills', '/bills', {
      body: bill,
    })
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setBill((prevBill: any) => ({
      ...prevBill,
      [name]: name == 'expirationDay' ? Number(value) : value,
    }))
  }

  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
      spacing={2}
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
  )
}
