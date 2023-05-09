import React from 'react'
import { Box } from '@mui/material'

function Layout({ children }: any) {
  return (
    <>
      <Box sx={{ py: 3, maxWidth: "80%", margin: "auto" }} >{children}</Box>
    </>
  )
}

export default Layout
