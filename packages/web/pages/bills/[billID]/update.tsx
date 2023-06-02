import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { billsByGroup } from '@/logic/billsByGroups'
import { selectAuthToken } from '@/store/authSlice'
import { selectBillsByGroups } from '@/store/billSlice'
import { Bill } from '@/types/bill'
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
  const billsByGroups: billsByGroup[] | undefined =
    useSelector(selectBillsByGroups)
  const dispatch = useDispatch()

  const router = useRouter()

  const { billID } = router.query

  const [isLoading, setIsLoading] = useState(true)

  const getBillInfoById = (billID: any) => {
    if (!billsByGroups || !billID || typeof billID !== 'string') return
    for (const group of billsByGroups) {
      const bill = group.bills.find((bill) => bill.billID === billID)
      if (bill) return bill
    }
  }

  const [bill, setBill] = useState<Bill.item | undefined>(
    getBillInfoById(billID)
  )

  useEffect(() => {
    const getBillInfo = async () => {
      if (bill || !billID) return
      try {
        const data: Bill.item = await API.get(
          'bills',
          `/bills/${billID}`,
          headerAuthToken(authToken)
        )
        setBill(data)
      } catch (e) {
        onError(e)
      }
    }
    getBillInfo()
    setIsLoading(false)
  }, [authToken, bill, billID])

  function validateForm() {
    if (!bill) return
    return bill.tag && bill.paymentWeb && bill.expirationDay && bill.reference
  }

  async function handleSubmit(_event: any) {
    setIsLoading(true)
    try {
      await API.put('bills', '/bills', {
        body: {
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

  const renderUpdateBillForm = () => {
    return (
      <>
        <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2, mb: 2 }}>
          Update your bill
        </Typography>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
          spacing={2}
          sx={{ my: 2 }}
        >
          {bill && (
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
          )}
        </Stack>
      </>
    )
  }

  return (
    <>
      {/* authToken ? renderNewBillForm() : renderLander() */}
      {renderUpdateBillForm()}
    </>
  )
}
