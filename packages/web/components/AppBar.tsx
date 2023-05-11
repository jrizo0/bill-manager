import config from '@/config'
import { TokenContext } from '@/context/session'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import { useContext, useEffect } from 'react'

export default function ButtonAppBar() {
  const { token: session, setToken: setSession } = useContext(TokenContext)

  useEffect(() => {
    const getSession = async () => {
      const token = localStorage.getItem('access_token')
      if (token) setSession(token)
    }
    getSession()
  }, [setSession])

  useEffect(() => {
    const access_token = new URLSearchParams(
      window.location.hash.substring(1)
    ).get('access_token')

    if (access_token) {
      localStorage.setItem('access_token', access_token)
      window.location.replace(window.location.origin)
    }
  }, [])

  const signOut = async () => {
    localStorage.removeItem('access_token')
    setSession(null)
  }

  const handleSignIn = () => {
    const params = new URLSearchParams({
      client_id: 'local',
      redirect_uri: location.origin,
      response_type: 'token',
      provider: 'google',
    })
    location.href = config.auth.URL + '/authorize?' + params.toString()
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
              <Button color='inherit' onClick={handleSignIn}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
