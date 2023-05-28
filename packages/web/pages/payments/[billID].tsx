import PayButton from '@/components/BillPayButton'
import DeleteButton from '@/components/DeleteButton'
import { headerAuthToken } from '@/lib/awsLib'
import { formatDate } from '@/lib/dateLib'
import { onError } from '@/lib/errorLib'
import { payBill } from '@/logic/bills'
import { selectAuthToken } from '@/store/authSlice'
import { selectBillsByGroups, setLastPayment } from '@/store/billSlice'
import { Bill } from '@/types/bill'
import { Payment } from '@/types/payment'
import { Box, Typography } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid'
import { API } from 'aws-amplify'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Payments() {
  const router = useRouter()
  const { billID } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [bill, setBill] = useState<Bill.item>()
  const [payments, setPayments] = useState<Payment.item[]>()

  const dispatch = useDispatch()
  const authToken = useSelector(selectAuthToken)
  const billsbyGroups = useSelector(selectBillsByGroups)

  const [rows, setRows] = useState<GridRowsProp>([])

  const handleDownloadFile = async (input: {
    paymentID: string
    billID: string
  }) => {
    setIsLoading(true)
    try {
      const data: Payment.item = await API.get(
        'bills',
        `/payments/${input.billID}/${input.paymentID}`,
        headerAuthToken(authToken)
      )
      // window.open(data.attachmentUrl, '_blank')
      window.open(data.attachmentUrl)
    } catch (error) {
      onError(error)
    }
    setIsLoading(false)
  }

  const handleRemovePayment = async (input: {
    billID: string
    paymentID: string
  }) => {
    setIsLoading(true)
    try {
      await API.del('bills', '/payments', {
        body: {
          paymentID: input.paymentID,
          billID: input.billID,
        },
        ...headerAuthToken(authToken),
      })
      const newPayments: Payment.item[] = payments!.filter(
        (pay) => pay.paymentID !== input.paymentID
      )
      setPayments(newPayments)
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  const columns: GridColDef[] = [
    { field: 'created', headerName: 'Created', width: 200 },
    { field: 'month', headerName: 'Month', width: 100 },
    { field: 'year', headerName: 'Year', width: 100 },
    {
      field: 'attachment',
      headerName: 'Attachment',
      width: 180,
      renderCell: (params: GridRenderCellParams<String>) => {
        return params.value === 'None' ? (
          <Typography variant='body1' sx={{ fontWeight: 'regular' }}>
            {params.value}
          </Typography>
        ) : (
          <Typography
            onClick={() => {
              if (typeof billID === 'string' && typeof params.id === 'string')
                handleDownloadFile({ paymentID: params.id, billID: billID })
            }}
            variant='body1'
            sx={{
              color: 'blue',
              fontWeight: 'regular',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {params.value}
          </Typography>
        )
      },
    },
    { field: 'ammount', headerName: 'Ammount', width: 120 },
    {
      field: 'action',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<String>) => {
        return (
          <DeleteButton
            confirmMsg='Are you sure you want to delete this payment'
            onConfirm={() => {
              if (typeof billID === 'string' && typeof params.id === 'string')
                handleRemovePayment({ paymentID: params.id, billID: billID })
            }}
          />
        )
      },
    },
  ]

  function formatFilename(str: string) {
    try {
      const s = str.split('/')
      const s2 = s[2]
      return s2.replace(/^\w+-/, '')
    } catch (e) {
      return str
    }
  }

  useEffect(() => {
    const setDataFrameValues = (payments: Payment.item[]) => {
      const rows: GridRowsProp = payments.map((pay, _i) => {
        return {
          id: pay.paymentID,
          created: formatDate(new Date(pay.created)),
          month: pay.month,
          year: pay.year,
          attachment: formatFilename(pay.attachment || 'None'),
          ammount: pay.ammount,
        }
      })
      setRows(rows)
    }

    async function onLoad() {
      try {
        const query: Payment.listDTO = await API.get(
          'bills',
          `/payments/${billID}`,
          headerAuthToken(authToken)
        )
        setPayments(query.data.payment)
        setBill(query.data.bill.at(0))
        setDataFrameValues(query.data.payment)
      } catch (e) {
        onError(e)
      }
      setIsLoading(false)
    }

    if (!authToken) return
    const BILLID_IN_ROUTE = !!billID && typeof billID === 'string'
    if (BILLID_IN_ROUTE && !payments) {
      onLoad()
    }
  }, [billsbyGroups, authToken, billID, payments])

  async function handlePayBill(input: {
    bill: Bill.item
    groupID: string
    file: File | null
    ammount?: number
    created?: string
  }) {
    if (!authToken) return
    setIsLoading(true)
    try {
      await payBill({
        ...input,
        authToken: authToken,
      })

      let creationDate = input.created
        ? moment(input.created).utc()
        : moment.utc()
      const currentLastPaymentOfBill = moment(input.bill.lastPayment).utc()
      if (creationDate > currentLastPaymentOfBill) {
        dispatch(
          setLastPayment({
            groupID: input.groupID,
            billID: input.bill.billID,
            lastPayment: creationDate.format(),
          })
        )
      }
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2, mb: 2 }}>
        Payments of {bill?.tag}
      </Typography>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
        />
        {bill && (
          <Box sx={{ py: 2 }}>
            <PayButton
              customName={'Create new payment'}
              customDate={true}
              sx={{ width: '100%' }}
              isLoading={isLoading}
              bill={bill}
              billID={bill.billID}
              onPayBill={handlePayBill}
              groupID={bill.groupID}
            />
          </Box>
        )}
      </div>
    </>
  )
}
