import { Bill } from '@/types/bill'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import PayButton from './BillPayButton'
import DeleteButton from './DeleteButton'
import EditAttributesIcon from '@mui/icons-material/EditAttributes'

type props = {
  billID: string
  groupID: string
  bill: Bill.item
  paid: boolean
  isLoading: boolean

  onPayBill: (input: {
    bill: Bill.item
    groupID: string
    file: File | null
    ammount?: number
  }) => Promise<any>
  onDeleteBill: (input: { billID: string; groupID: string }) => void
}

const BillListItem = (props: props) => {
  const router = useRouter()

  const renderLoaderButton = () => {
    return props.paid ? (
      <span className='billPaid'>Pagada</span>
    ) : (
      <PayButton {...props} />
    )
  }

  const renderExpiration = () => {
    const daysLeft = props.bill.expirationDay - new Date().getDate()
    return (
      !props.paid &&
      (daysLeft > 0 ? (
        <Typography variant='body1' sx={{ fontWeight: 'regular', mx: 2 }}>
          Expires in {daysLeft} days
        </Typography>
      ) : (
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', mx: 2, color: '#FF0000' }}
        >
          {daysLeft === 0 ? 'Expires today' : `Expired ${-daysLeft} days ago`}
        </Typography>
      ))
    )
  }

  const goToPaymentsBill = () => {
    router.push(`/payments/${props.bill.billID}`)
  }

  const goToUpdateBill = () => {
    router.push(`/bills/${props.bill.billID}/update`)
  }

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'baseline',
            }}
          >
            <Typography variant='body1' sx={{ fontWeight: 'bold', ml: 2 }}>
              {props.bill.tag.trim().split('\n').slice(0, 3)}:
            </Typography>
            <Tooltip title='Copy'>
              <Button
                variant='text'
                onClick={() => {
                  navigator.clipboard.writeText(props.bill.reference)
                }}
                size='large'
                sx={{ color: '#000000', textTransform: 'none' }}
              >
                {props.bill.reference}
              </Button>
            </Tooltip>

            {renderExpiration()}
          </Box>

          <Link
            href={props.bill.paymentWeb}
            target='_blank'
            rel='noopener noreferrer'
            sx={{ mx: 2, pb: 1, fontWeight: 'regular' }}
          >
            {new URL(props.bill.paymentWeb).host}
          </Link>
        </Box>

        <Button onClick={goToUpdateBill} sx={{ ml: 'auto' }}>
          <EditAttributesIcon />
        </Button>

        <Button onClick={goToPaymentsBill} sx={{ ml: 'auto' }}>
          Payments
        </Button>

        <Box sx={{ mx: 2 }}>{renderLoaderButton()}</Box>

        {props.isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <DeleteButton
            confirmMsg='Are you sure you want to delete the bill?'
            onConfirm={() => {
              props.onDeleteBill({
                groupID: props.groupID,
                billID: props.bill.billID,
              })
            }}
          />
        )}
      </ListItem>
    </>
  )
}

export default BillListItem
