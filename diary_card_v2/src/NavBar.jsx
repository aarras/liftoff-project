import React from 'react'
import Button from '@material-ui/core/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

export const NavBar = ({ color }) => (
<>
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/home">Diary Card</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/forms">Forms</Nav.Link>
      <Nav.Link href="/view-logs">View Logs</Nav.Link>
    </Nav>
    <Form inline>
      <Button href="/register">Log Out</Button>
    </Form>
  </Navbar>
</>
)