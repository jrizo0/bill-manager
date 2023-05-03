import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { bill } from '../types/bill';
import DeleteButton from './DeleteButton';

type BillProps = {
  bill: bill
  onPayBill: (billID: string) => void
  onDeleteBill: (billID: string) => void
  isLoading: boolean
}


const Bill = ({ bill, onPayBill, onDeleteBill, isLoading }: BillProps) => {
  const renderLoaderButton = () => {
    return (
      bill.paid ? (
        <span className="billPaid">Pagada</span>
      ) : (
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disabled={isLoading}
          onClick={() => onPayBill(bill.billID)}
        >
          Pay bill
        </LoadingButton>
      )
    )
  }
  function renderExpiration() {
    const daysLeft = bill.expirationDay - new Date().getDate()
    return (
      bill.paid ? (
        <></>
      ) : (

        daysLeft > 0 ? (
          <Typography variant="body1" sx={{ fontWeight: 'regular', mx: 2 }} >
            Expires in {daysLeft} days
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 2, color: "#FF0000" }} >
            Expired {-daysLeft} days ago
          </Typography>
        )

      )

    )
  }

  return (
    <>
      <ListItem
        sx={{ py: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        divider={true}
        secondaryAction={
          isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <DeleteButton onConfirm={() => { onDeleteBill(bill.billID) }} />
          )
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: 'baseline' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 2 }} >
              {bill.tag.trim().split("\n").slice(0, 3)}:
            </Typography>
            <Tooltip title="Copy">
              <Button
                variant="text"
                onClick={() => { navigator.clipboard.writeText(bill.reference); }}
                size="large"
                sx={{ color: "#000000", textTransform: 'none' }}
              >
                {bill.reference}
              </Button>
            </Tooltip>

            {renderExpiration()}

          </Box>

          <Link
            href={bill.paymentWeb}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 2, my: 1, fontWeight: "regular" }}
          >
            {(new URL(bill.paymentWeb)).host}
          </Link>
        </Box>

        <Box sx={{ mx: 2 }}>
          {renderLoaderButton()}
        </Box>
      </ListItem>
    </>
  );
};

export default Bill
