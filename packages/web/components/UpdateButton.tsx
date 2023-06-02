// TODO: Update page
import { Bill } from '@/types/bill'
import { LoadingButton } from '@mui/lab'
import { Input, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useRef, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'

type props = {
  billID: string
  groupID: string
  bill: Bill.item
  isLoading: boolean

  onPayBill: (input: {
    bill: Bill.item
    groupID: string
    file: File | null
    ammount?: number
    created?: string
  }) => Promise<any>

  sx?: any
  customName?: string
  customDate?: boolean
}

const UpdateButton = (props: props) => {
  const file = useRef<File | null>(null)
  const [ammount, setAmmount] = useState<number>()
  const [date, setDate] = useState<string>()
  const [open, setOpen] = useState(false)
  const today = moment.utc()

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    file.current = null
    setOpen(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (event.target.files?.[0]) file.current = event.target.files?.[0]
  }

  const handleAmmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    setAmmount(Number(event.target.value))
  }

  const handleDateChange = (event: any) => {
    if (!event) return
    setDate(moment(event).utc().format())
  }

  const handleClose = () => {
    !props.isLoading && setOpen(false)
  }

  const handlePay = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    await props.onPayBill({
      groupID: props.groupID,
      bill: props.bill,
      file: file.current,
      ammount: ammount,
      ...(props.customDate && date && { created: date }),
    })
    handleClose()
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen} sx={props.sx}>
        {props.customName || 'Pay'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pay bill: {props.bill.tag}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the invoice of the payment
          </DialogContentText>
          <Input type='file' sx={{ my: 2 }} onChange={handleFileChange} />
          <Typography sx={{ alignItems: 'center' }}>Ammount:</Typography>
          <Input
            type='number'
            sx={{ mt: 1, width: '100%' }}
            onChange={handleAmmountChange}
          />
          {props.customDate && (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <br />
              <DatePicker
                sx={{ mt: 2, width: '100%' }}
                onChange={handleDateChange}
                defaultValue={today}
              />
            </LocalizationProvider>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={props.isLoading}
            variant='contained'
            disabled={props.isLoading}
            onClick={handlePay}
          >
            Pay bill
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateButton
