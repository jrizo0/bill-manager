import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link href="/" className="fw-bold text-muted" style={{ textDecoration: 'none' }}>Bill-Manager</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
  {
    // <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
    //   <Link href="/" className="fw-bold text-muted" style={{ textDecoration: 'none' }}>Bill-Manager</Link>
    //   <Navbar.Toggle />
    // <Navbar.Collapse className="justify-content-end">
    //   <>
    //     <Button className="fw-bold text-muted" variant="link" href="/settings">Settings</Button>
    //     <Button className="fw-bold text-muted" variant="link" onClick={handleLogout}>Logout</Button>
    //   </>
    // </Navbar.Collapse>
    // </Navbar>
  }
}
