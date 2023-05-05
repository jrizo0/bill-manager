import { bill } from '../types/bill'
import { ListGroup } from 'react-bootstrap'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

type BillProps = {
  bill: bill
  onPayBill: (billID: string) => void
  isLoading: boolean
}

const renderLoaderButton = ({ bill, onPayBill, isLoading }: BillProps) => {
  return bill.paid ? (
    <span className='billPaid'>Pagada</span>
  ) : (
    <LoadingButton
      loading={isLoading}
      variant='contained'
      color='success'
      disabled={isLoading}
      onClick={() => onPayBill(bill.billID)}
    >
      Pay bill
    </LoadingButton>
  )
}

const Bill = ({ bill, onPayBill, isLoading }: BillProps) => {
  // <span className="ms-2 fw-regular"> {bill.reference}</span> }
  return (
    <>
      <ListGroup.Item
        key={bill.billID}
        // action
        // href={`/bills/${bill.billID}`}
        className='py-3 d-flex text-nowrap text-truncate justify-content-between align-items-center'
      >
        <div>
          <span className='ms-2 fw-bold'>
            {bill.tag.trim().split('\n').slice(0, 3)} :{' '}
          </span>

          <Tooltip title='Copy'>
            <Button
              variant='text'
              onClick={() => {
                navigator.clipboard.writeText(bill.reference)
              }}
              size='large'
              style={{ color: '#000000' }}
            >
              {bill.reference}
            </Button>
          </Tooltip>

          <br />
          <a
            className='ms-2 fw-regular'
            href={bill.paymentWeb}
            target='_blank'
            rel='noopener noreferrer'
          >
            {bill.paymentWeb}
          </a>
        </div>

        <div className='mx-2'>
          {renderLoaderButton({ bill, onPayBill, isLoading })}
        </div>
      </ListGroup.Item>
    </>
  )
}

export default Bill
