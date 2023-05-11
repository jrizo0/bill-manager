import Bill from '@/components/Bill'
import { TokenContext } from '@/context/session'
import { headerAuthToken } from '@/lib/awsLib'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { API } from 'aws-amplify'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { onError } from '../lib/errorLib'

const Home: NextPage<any> = () => {
  const [bills, setBills] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useContext(TokenContext)

  useEffect(() => {
    async function onLoad() {
      try {
        const bills = await API.get('bills', '/bills', headerAuthToken(token))
        setBills(bills)
      } catch (e) {
        onError(e)
      }
      setIsLoading(false)
    }

    if (token) onLoad()
  }, [token])

  async function handlePayBill(_id: any) {
    setIsLoading(true)
    try {
      await API.post('bills', `/payments/${_id}`, headerAuthToken(token))
      const index = bills.findIndex((bill: any) => bill.billID === _id)
      const updatedBill = { ...bills[index], paid: true }
      const newBills = [...bills]
      newBills[index] = updatedBill
      setBills(newBills)
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  async function handleDeleteBill(_id: any) {
    setIsLoading(true)
    try {
      await API.del('bills', `/bills/${_id}`, headerAuthToken(token))
      setBills((prev: any) => [
        ...prev.filter((bill: any) => bill.billID != _id),
      ])
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  function renderBillsList(bills: any) {
    return (
      <>
        <List>
          <ListItemButton
            divider={true}
            href='/bills/new'
            sx={{ py: 3, borderRadius: '10px' }}
          >
            <BsPencilSquare size={17} />
            <Box mx={{ marginInlineStart: 4, fontWeight: 'bold' }}>
              Create a new bill
            </Box>
          </ListItemButton>
          {bills &&
            bills.map((bill: any) => (
              <Bill
                key={bill.billID}
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

  function renderLander() {
    return (
      <div className='lander'>
        <h1>Scratch</h1>
        <p className='text-muted'>A simple bill manager app</p>
      </div>
    )
  }

  function renderBills() {
    return (
      // <ListGroup>{!isLoading && renderBillsList(bills)}</ListGroup>
      <div className='bills'>
        <Typography variant='h5' component='div' sx={{ mt: 4, mx: 2 }}>
          Your bills
        </Typography>
        {/*  <h2 className="pb-3 mt-4 mb-3 border-bottom">Your bills</h2>  */}
        <List>{renderBillsList(bills)}</List>
      </div>
    )
  }

  return (
    <>
      <div className='Home'>
        {token ? renderBills() : renderLander()}
        {/* renderBills() */}
        {/* renderLander() */}
      </div>
    </>
  )
}

export default Home
