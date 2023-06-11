import BillListItem from '@/components/BillListItem'
import { headerAuthToken } from '@/lib/awsLib'
import { payBill } from '@/logic/bills'
import { billsByGroup } from '@/logic/billsByGroups'
import { selectAuthToken } from '@/store/authSlice'
import {
  deleteBill,
  selectBillsByGroups,
  setData,
  setLastPayment,
} from '@/store/billSlice'
import { allBillsDTO } from '@/types/allBillsDTO'
import { Bill } from '@/types/bill'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItemButton,
  Typography,
} from '@mui/material'
import { API } from 'aws-amplify'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { onError } from '../lib/errorLib'
import dayjs from 'dayjs'

const Home: NextPage<any> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const authToken = useSelector(selectAuthToken)
  const billsByGroups: billsByGroup[] | undefined =
    useSelector(selectBillsByGroups)
  const dispatch = useDispatch()

  let today = new Date()

  useEffect(() => {
    async function onLoad() {
      if (billsByGroups) return
      try {
        const data: allBillsDTO = await API.get(
          'bills',
          '/bills/all',
          headerAuthToken(authToken)
        )
        dispatch(setData(data))
      } catch (e) {
        onError(e)
      }
      setIsLoading(false)
    }
    if (authToken) onLoad()
  }, [billsByGroups, authToken, dispatch])

  async function handlePayBill(input: {
    bill: Bill.item
    groupID: string
    file: File | null
    ammount?: number
  }) {
    if (!authToken) return
    setIsLoading(true)
    try {
      await payBill({
        ...input,
        authToken: authToken,
      })
      today = new Date()
      dispatch(
        setLastPayment({
          groupID: input.groupID,
          billID: input.bill.billID,
          lastPayment: today.toISOString(),
        })
      )
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  async function handleDeleteBill(input: { billID: string; groupID: string }) {
    setIsLoading(true)
    try {
      await API.del('bills', '/bills', {
        body: {
          billID: input.billID,
        },
        ...headerAuthToken(authToken),
      })
      dispatch(deleteBill({ billID: input.billID, groupID: input.groupID }))
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  function renderGroup(index: number, billsByGroup: billsByGroup) {
    return (
      <Accordion key={billsByGroup.group.groupID}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id={billsByGroup.group.groupID}
        >
          <Typography
            variant='h6'
            noWrap
            // component='a'
            sx={{
              // textTransform:'uppercase',
              fontWeight: 'bold',
            }}
          >
            {billsByGroup.group.name === billsByGroup.group.groupID
              ? 'Personal bills'
              : billsByGroup.group.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails key={index}>
          {renderBillsList({
            bills: billsByGroup.bills,
            groupID: billsByGroup.group.groupID,
          })}
        </AccordionDetails>
      </Accordion>
    )
  }

  function renderGroupsList() {
    return (
      <>
        {billsByGroups &&
          billsByGroups.map((group: billsByGroup, index: number) =>
            renderGroup(index, group)
          )}
      </>
    )
  }

  function isPaid(pay: string) {
    if (dayjs(pay).year() > dayjs().year()) return true
    else if (dayjs(pay).year() < dayjs().year()) return false

    if (dayjs(pay).month() >= dayjs().month()) return true
    else return false
  }

  function renderBillsList(input: { bills: Bill.item[]; groupID: string }) {
    return (
      <>
        <List>
          <ListItemButton
            divider={true}
            href={`/bills/new/${input.groupID}`}
            sx={{ py: 2, borderRadius: '10px' }}
          >
            <BsPencilSquare size={17} />
            <Box mx={{ marginInlineStart: 4, fontWeight: 'bold' }}>
              Create a new bill
            </Box>
          </ListItemButton>
          {input.bills &&
            input.bills.map((bill: Bill.item) => (
              <BillListItem
                key={bill.billID}
                billID={bill.billID}
                groupID={input.groupID}
                paid={isPaid(bill.lastPayment)}
                bill={bill}
                isLoading={isLoading}
                onPayBill={handlePayBill}
                onDeleteBill={handleDeleteBill}
              />
            ))}
        </List>
      </>
    )
  }

  function renderBills() {
    return (
      // <ListGroup>{!isLoading && renderBillsList(bills)}</ListGroup>
      <div className='bills'>
        <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2, mb: 2 }}>
          Your bills
        </Typography>
        {/*  <h2 className="pb-3 mt-4 mb-3 border-bottom">Your bills</h2>  */}
        <List>{renderGroupsList()}</List>
      </div>
    )
  }

  function renderLander() {
    return (
      <div className='lander'>
        <h1>Scratch</h1>
        <p className='text-muted'>A simple bill manager app</p>
      </div>
    )
  }

  return (
    <>
      <div className='Home'>
        {authToken ? renderBills() : renderLander()}
        {/* renderBills() */}
        {/* renderLander() */}
      </div>
    </>
  )
}

export default Home
