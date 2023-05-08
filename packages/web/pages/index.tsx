import Bill from '@/components/Bill'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { API } from 'aws-amplify'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { BsPencilSquare } from 'react-icons/bs'
import { onError } from '../lib/errorLib'

const Home: NextPage<any> = ({ data }) => {
  const [bills, setBills] = useState<any>(data)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function onLoad() {
      try {
        const bills = await loadBills()
        setBills(bills)
        console.log(bills)
      } catch (e) {
        onError(e)
      }
      setIsLoading(false)
    }

    onLoad()
  }, [])

  function loadBills() {
    return API.get('bills', '/bills', {})
  }

  async function handlePayBill(_id: any) {
    setIsLoading(true)
    try {
      await API.post('bills', `/payments/${_id}`, {})
      const newBills: any = bills.map((bill: any) => {
        if (bill.billID == _id) {
          bill.paid = true
        }
        return bill
      })
      setBills(newBills)
    } catch (e: any) {
      onError(e)
    }
    setIsLoading(false)
  }

  async function handleDeleteBill(_id: any) {
    setIsLoading(true)
    try {
      await API.del('bills', `/bills/${_id}`, {})
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
            <span className='ms-2 fw-bold'>Create a new bill</span>
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
        <ListGroup>{renderBillsList(bills)}</ListGroup>
      </div>
    )
  }

  return (
    <>
      <div className='Home'>
        {/* isAuthenticated ? renderBills() : renderLander() */}
        {renderBills()}
        {/* renderLander() */}
      </div>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps<any> = async () => {
//   try {
//     const data = await API.get("bills", "/bills", {});
//     return { props: { data } }
//   } catch (e) {
//     onError(e);
//     return { props: [] }
//   }
// }

export default Home
