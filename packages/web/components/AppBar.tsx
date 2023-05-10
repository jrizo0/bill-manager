import config from '@/config'
import { SessionContext } from '@/context/session'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import { API } from 'aws-amplify'
import { useContext, useEffect } from 'react'

export default function ButtonAppBar() {
  const { session, setSession } = useContext(SessionContext)

  useEffect(() => {
    const getSession = async () => {
      const token = localStorage.getItem('session')
      if (token) {
        const user = await getUserInfo(token)
        if (user) setSession(user)
      }
    }
    getSession()
  }, [setSession])

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('session', token)
      window.location.replace(window.location.origin)
    }
  }, [])

  const getUserInfo = async (session: any) => {
    try {
      const response = await API.get('bills', '/session', {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      return response
    } catch (error) {
      // alert(error)
      console.error(error)
    }
  }

  const signOut = async () => {
    localStorage.removeItem('session')
    setSession(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <Link
            href='/'
            className='fw-bold text-muted'
            style={{ textDecoration: 'none' }}
            sx={{ flexGrow: 1, fontWeight: 'bold', color: 'inherit' }}
          >
            Bill-Manager
          </Link>
          {session ? (
            <>
              <Button color='inherit' onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color='inherit'
                href={`${config.apiGateway.URL}/auth/google/authorize`}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
