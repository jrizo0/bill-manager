import config from '@/config'
import { selectAuthToken, setAuthToken } from '@/store/authSlice'
import { MenuItem, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

export default function ButtonAppBar() {
  const authToken = useSelector(selectAuthToken)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        dispatch(setAuthToken(token))
      }
    }
    getSession()
  }, [dispatch])

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
    dispatch(setAuthToken(null))
    router.replace('/')
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

  const goGroups = () => {
    router.push('/groups')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <AccountBalanceWalletIcon
            sx={{ display: { md: 'flex' }, mr: 1 }}
            onClick={() => {
              router.push('/')
            }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BillManager
          </Typography>
          {authToken ? (
            <>
              <MenuItem onClick={goGroups}>
                <Typography textAlign='center'>Groups</Typography>
              </MenuItem>
              <MenuItem sx={{ ml: 'auto' }} onClick={signOut}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem sx={{ ml: 'auto' }} onClick={handleSignIn}>
                <Typography textAlign='center'>Login</Typography>
              </MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
